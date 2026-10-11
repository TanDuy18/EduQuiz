import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { decodeGoogleJwt } from '../services/authService';

WebBrowser.maybeCompleteAuthSession();

export const GOOGLE_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ||
  '523492188764-iltkgn370virte0sso28gnr81d92au4q.apps.googleusercontent.com';

declare global {
  interface Window {
    google?: any;
  }
}

export interface GoogleUserProfile {
  id: string | number;
  email: string;
  name: string;
  avatar?: string;
}

/**
 * Tải và khởi tạo Google Identity Services (GSI) trên Web
 */
export function initGoogleWebAuth(onCredential: (credential: string) => void) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;

  const existingScript = document.getElementById('google-gsi-client');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'google-gsi-client';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      try {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (res: any) => {
              if (res?.credential) {
                onCredential(res.credential);
              }
            },
          });
        }
      } catch (e) {
        console.warn('Google GSI init error', e);
      }
    };
    document.body.appendChild(script);
  } else if (window.google?.accounts?.id) {
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (res: any) => {
          if (res?.credential) {
            onCredential(res.credential);
          }
        },
      });
    } catch (e) {
      console.warn('Google GSI re-init error', e);
    }
  }
}

/**
 * Kích hoạt popup đăng nhập Google thực tế
 */
export async function performGoogleSignIn(): Promise<{
  success: boolean;
  user?: GoogleUserProfile;
  credential?: string;
  error?: string;
}> {
  if (Platform.OS === 'web') {
    // Trên Web: Thử dùng Google OAuth2 Token Client (chuẩn popup mới nhất của Google)
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
        try {
          const client = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: 'openid email profile',
            callback: async (tokenResponse: any) => {
              if (tokenResponse?.access_token) {
                try {
                  const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                  });
                  if (userRes.ok) {
                    const profile = await userRes.json();
                    resolve({
                      success: true,
                      user: {
                        id: profile.sub || Date.now(),
                        email: profile.email,
                        name: profile.name,
                        avatar: profile.picture,
                      },
                      credential: tokenResponse.access_token,
                    });
                    return;
                  }
                } catch {
                  // Fallback
                }
                resolve({
                  success: true,
                  credential: tokenResponse.access_token,
                });
              } else {
                resolve({ success: false, error: 'Không nhận được access token từ Google' });
              }
            },
            error_callback: (err: any) => {
              resolve({ success: false, error: err?.message || 'Cửa sổ Google đóng hoặc bị hủy' });
            },
          });
          client.requestAccessToken({ prompt: 'select_account' });
          return;
        } catch {
          // Fallback tiếp tục bên dưới
        }
      }

      if (typeof window !== 'undefined' && window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (res: any) => {
            if (res?.credential) {
              resolve({
                success: true,
                credential: res.credential,
              });
            } else {
              resolve({ success: false, error: 'Không nhận được mã xác thực Google' });
            }
          },
        });
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            openGoogleOAuthWeb().then(resolve);
          }
        });
      } else {
        openGoogleOAuthWeb().then(resolve);
      }
    });
  }

  // Trên Mobile (Android / iOS): Dùng WebBrowser mở luồng Google OAuth thực tế
  return await openGoogleOAuthMobile();
}

/**
 * Mở cửa sổ OAuth Google trên Web
 */
async function openGoogleOAuthWeb(): Promise<{
  success: boolean;
  user?: GoogleUserProfile;
  credential?: string;
  error?: string;
}> {
  try {
    const redirectUri = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8081';
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token%20id_token` +
      `&scope=${encodeURIComponent('openid email profile')}` +
      `&nonce=${Math.random().toString(36).substring(2)}` +
      `&prompt=select_account`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
    return parseAuthSessionResult(result);
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi đăng nhập Google Web' };
  }
}

/**
 * Mở cửa sổ OAuth Google trên Mobile (Android qua Chrome Custom Tabs)
 */
async function openGoogleOAuthMobile(): Promise<{
  success: boolean;
  user?: GoogleUserProfile;
  credential?: string;
  error?: string;
}> {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'eduquiz',
      path: 'auth',
    });

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token%20id_token` +
      `&scope=${encodeURIComponent('openid email profile')}` +
      `&nonce=${Math.random().toString(36).substring(2)}` +
      `&prompt=select_account`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
    return await parseAuthSessionResult(result);
  } catch (err: any) {
    return { success: false, error: err?.message || 'Lỗi đăng nhập Google Mobile' };
  }
}

/**
 * Bóc tách token và lấy thông tin tài khoản thật từ Google API
 */
async function parseAuthSessionResult(result: WebBrowser.WebBrowserAuthSessionResult): Promise<{
  success: boolean;
  user?: GoogleUserProfile;
  credential?: string;
  error?: string;
}> {
  if (result.type !== 'success' || !result.url) {
    return { success: false, error: 'Đăng nhập bị hủy bởi người dùng' };
  }

  try {
    // Trích xuất access_token hoặc id_token từ URL trả về (# hoặc ?)
    const url = result.url;
    let queryString = '';
    if (url.includes('#')) {
      queryString = url.substring(url.indexOf('#') + 1);
    } else if (url.includes('?')) {
      queryString = url.substring(url.indexOf('?') + 1);
    }

    const params = new URLSearchParams(queryString);
    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');

    if (accessToken) {
      // Gọi API Google lấy thông tin hồ sơ thật
      const userRes = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (userRes.ok) {
        const profile = await userRes.json();
        return {
          success: true,
          user: {
            id: profile.id || Date.now(),
            email: profile.email,
            name: profile.name,
            avatar: profile.picture,
          },
          credential: idToken || accessToken,
        };
      }
    }

    if (idToken) {
      const decoded = decodeGoogleJwt(idToken);
      return {
        success: true,
        credential: idToken,
        user: decoded
          ? {
              id: Date.now(),
              email: decoded.email || '',
              name: decoded.name || 'Học viên Google',
              avatar: decoded.avatar,
            }
          : undefined,
      };
    }

    return { success: false, error: 'Không tìm thấy token trong phản hồi Google' };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Lỗi trích xuất thông tin Google' };
  }
}
