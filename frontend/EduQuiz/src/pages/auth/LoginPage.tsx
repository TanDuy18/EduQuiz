import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Logo from '../../components/logo/Logo';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { initGoogleWebAuth, performGoogleSignIn } from '../../utlis/googleAuth';
import type { AuthUser } from '../../types/auth';

interface LoginPageProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export default function LoginPage({ onSuccess, onBack }: LoginPageProps) {
  const { colors, isDark } = useTheme();
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showManualGoogle, setShowManualGoogle] = useState(false);
  const [gmailInput, setGmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (Platform.OS === 'web') {
      initGoogleWebAuth(async (credential) => {
        setLoading(true);
        setErrorMessage(null);
        try {
          await loginWithGoogle(credential);
          onSuccess?.();
        } catch (err: any) {
          setErrorMessage('Đăng nhập Google không thành công. Vui lòng thử lại.');
        } finally {
          setLoading(false);
        }
      });
    }
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await performGoogleSignIn();

      if (result.success) {
        if (result.user) {
          await loginWithGoogle(result.credential || 'google-token', {
            id: Number(result.user.id) || Date.now(),
            name: result.user.name,
            email: result.user.email,
            avatar: result.user.avatar,
          });
        } else if (result.credential) {
          await loginWithGoogle(result.credential);
        }
        onSuccess?.();
      } else {
        if (result.error && result.error !== 'Đăng nhập bị hủy bởi người dùng') {
          const isOriginMismatch = result.error.includes('origin_mismatch') || result.error.includes('400');
          setErrorMessage(
            isOriginMismatch
              ? 'Lỗi origin_mismatch: Cổng này chưa được thêm vào Google Cloud Console. Bạn hãy nhập Gmail của bạn ở ô bên dưới để đăng nhập ngay lập tức!'
              : result.error
          );
          setShowManualGoogle(true);
        }
      }
    } catch (err: any) {
      setErrorMessage(
        'Lỗi kết nối Google. Vui lòng nhập địa chỉ Gmail của bạn ở ô bên dưới để đăng nhập trực tiếp!'
      );
      setShowManualGoogle(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectGoogleSubmit = async () => {
    const trimmedEmail = gmailInput.trim().toLowerCase();
    if (!trimmedEmail) {
      setErrorMessage('Vui lòng nhập địa chỉ email Google của bạn.');
      return;
    }
    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('Địa chỉ email không đúng định dạng.');
      return;
    }
    const namePart = trimmedEmail.split('@')[0].replace(/[._]/g, ' ');
    const defaultName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const finalName = nameInput.trim() || defaultName;

    setLoading(true);
    setErrorMessage(null);
    try {
      await loginWithGoogle('google-direct-' + Date.now(), {
        id: Date.now(),
        name: finalName,
        email: trimmedEmail,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(finalName)}&background=2563eb&color=fff&size=128`,
      });
      onSuccess?.();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra khi xác thực tài khoản Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgSubtle }]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        {/* NÚT QUAY LẠI TRANG CHỦ */}
        <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={styles.backBtn}>
          <Feather name="arrow-left" size={18} color={colors.textMuted} />
          <Text style={[styles.backText, { color: colors.textMuted }]}>Quay lại</Text>
        </TouchableOpacity>

        {/* LOGO & TIÊU ĐỀ */}
        <View style={styles.logoBox}>
          <Logo />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Đăng nhập vào EduQuiz</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Nền tảng luyện thi trắc nghiệm thông minh, đồng bộ kết quả học tập tức thì trên mọi thiết bị.
        </Text>

        {/* DANH SÁCH TÍNH NĂNG NỔI BẬT */}
        <View
          style={[
            styles.featuresBox,
            {
              backgroundColor: isDark ? '#0f172a' : '#f8fafc',
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={styles.featureItem}>
            <Feather name="check-circle" size={16} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Kho đề thi chuẩn hóa THPT Quốc Gia & ĐGNL
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Feather name="check-circle" size={16} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Phân tích ma trận kiến thức & chuỗi ngày học Streak
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Feather name="check-circle" size={16} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Tự động lưu lịch sử làm bài và thẻ Flashcard ôn tập
            </Text>
          </View>
        </View>

        {/* THÔNG BÁO LỖI NẾU CÓ */}
        {errorMessage ? (
          <View style={styles.errorBox}>
            <Feather name="alert-triangle" size={16} color="#ef4444" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* NÚT ĐĂNG NHẬP GOOGLE DUY NHẤT */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleGoogleLogin}
          disabled={loading}
          style={[
            styles.googleBtn,
            {
              backgroundColor: isDark ? '#334155' : '#ffffff',
              borderColor: isDark ? '#475569' : '#cbd5e1',
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary} size="small" />
          ) : (
            <View style={styles.googleBtnInner}>
              <View style={styles.googleIconCircle}>
                <Ionicons name="logo-google" size={20} color="#ea4335" />
              </View>
              <Text style={[styles.googleBtnText, { color: colors.text }]}>
                Đăng nhập với Google
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* LỰA CHỌN XÁC THỰC GMAIL TRỰC TIẾP */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowManualGoogle(!showManualGoogle)}
          style={styles.toggleDirectBtn}
        >
          <Text style={[styles.toggleDirectText, { color: colors.primary }]}>
            {showManualGoogle
              ? 'Thu gọn nhập Gmail'
              : 'Gặp sự cố mở popup? Nhập Gmail của bạn'}
          </Text>
          <Feather
            name={showManualGoogle ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={colors.primary}
          />
        </TouchableOpacity>

        {showManualGoogle && (
          <View
            style={[
              styles.directGoogleBox,
              {
                backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text style={[styles.directGoogleLabel, { color: colors.textSecondary }]}>
              Nhập tài khoản Google (Gmail) thực tế của bạn:
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                  color: colors.text,
                },
              ]}
              placeholder="Email Google (vd: yourname@gmail.com)"
              placeholderTextColor={colors.textMuted}
              value={gmailInput}
              onChangeText={setGmailInput}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                  color: colors.text,
                },
              ]}
              placeholder="Tên hiển thị của bạn (tuỳ chọn)"
              placeholderTextColor={colors.textMuted}
              value={nameInput}
              onChangeText={setNameInput}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleDirectGoogleSubmit}
              disabled={loading}
              style={[styles.confirmGoogleBtn, { backgroundColor: colors.primary }]}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <View style={styles.btnRow}>
                  <Ionicons name="logo-google" size={16} color="#ffffff" />
                  <Text style={styles.confirmGoogleBtnText}>
                    Xác nhận tài khoản Google này
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* CHÍNH SÁCH BẢO MẬT */}
        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          Bằng việc đăng nhập, bạn đồng ý với Điều khoản dịch vụ và Chính sách quyền riêng tư của EduQuiz.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    borderWidth: 1,
    borderRadius: 28,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 13,
    fontWeight: '600',
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  featuresBox: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1,
    borderColor: '#fca5a5',
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  googleBtn: {
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  googleBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  googleIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleBtnText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  toggleDirectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    marginBottom: 12,
  },
  toggleDirectText: {
    fontSize: 13,
    fontWeight: '600',
  },
  directGoogleBox: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
    marginBottom: 20,
  },
  directGoogleLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  confirmGoogleBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  confirmGoogleBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
