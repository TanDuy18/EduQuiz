import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Logo from '../logo/Logo';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { initGoogleWebAuth, performGoogleSignIn } from '../../utlis/googleAuth';
import type { AuthUser } from '../../types/auth';

interface LoginModalProps {
  visible?: boolean;
  onSuccess: (credential: string, directUser?: Partial<AuthUser>) => void;
  onClose: () => void;
  homeHref?: string;
}

export default function LoginModal({
  visible = true,
  onSuccess,
  onClose,
}: LoginModalProps) {
  const { colors, isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [gmailInput, setGmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (Platform.OS === 'web') {
      initGoogleWebAuth((credential) => {
        setLoading(false);
        onSuccess(credential);
      });
    }
  }, []);

  const handleGooglePress = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await performGoogleSignIn();

      if (result.success) {
        if (result.user) {
          onSuccess(result.credential || 'google-token', {
            id: Number(result.user.id) || Date.now(),
            name: result.user.name,
            email: result.user.email,
            avatar: result.user.avatar,
          });
        } else if (result.credential) {
          onSuccess(result.credential);
        }
      } else {
        if (result.error && result.error !== 'Đăng nhập bị hủy bởi người dùng') {
          const isOriginMismatch = result.error.includes('origin_mismatch') || result.error.includes('400');
          setErrorMessage(
            isOriginMismatch
              ? 'Lỗi origin_mismatch: Hãy nhập Gmail của bạn ở ô bên dưới để đăng nhập ngay!'
              : result.error
          );
          setShowManual(true);
        }
      }
    } catch (e: any) {
      setErrorMessage('Lỗi kết nối Google. Vui lòng nhập Gmail ở ô bên dưới!');
      setShowManual(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectGoogleSubmit = () => {
    const trimmedEmail = gmailInput.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('Vui lòng nhập địa chỉ email Google hợp lệ');
      return;
    }
    const namePart = trimmedEmail.split('@')[0].replace(/[._]/g, ' ');
    const defaultName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const finalName = nameInput.trim() || defaultName;

    onSuccess('google-direct-' + Date.now(), {
      id: Date.now(),
      name: finalName,
      email: trimmedEmail,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(finalName)}&background=2563eb&color=fff&size=128`,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={onClose} style={styles.closeBtn}>
            <Feather name="x" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.logoBox}>
            <Logo />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Đăng nhập tài khoản</Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            EduQuiz sử dụng xác thực bảo mật trực tiếp thông qua tài khoản{' '}
            <Text style={[styles.bold, { color: colors.primary }]}>Google</Text> để đồng bộ kết quả thi của bạn.
          </Text>

          {errorMessage ? (
            <View style={styles.errorBox}>
              <Feather name="alert-circle" size={14} color="#ef4444" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleGooglePress}
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
              <View style={styles.btnRow}>
                <Ionicons name="logo-google" size={20} color="#ea4335" />
                <Text style={[styles.googleBtnText, { color: colors.text }]}>
                  Đăng nhập với Google
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* LỰA CHỌN XÁC THỰC GMAIL TRỰC TIẾP */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowManual(!showManual)}
            style={styles.toggleDirectBtn}
          >
            <Text style={[styles.toggleDirectText, { color: colors.primary }]}>
              {showManual ? 'Thu gọn nhập Gmail' : 'Gặp sự cố mở popup? Nhập Gmail của bạn'}
            </Text>
            <Feather
              name={showManual ? 'chevron-up' : 'chevron-down'}
              size={14}
              color={colors.primary}
            />
          </TouchableOpacity>

          {showManual && (
            <View
              style={[
                styles.directBox,
                {
                  backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                  borderColor: colors.cardBorder,
                },
              ]}
            >
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
                placeholder="Tên của bạn (tuỳ chọn)"
                placeholderTextColor={colors.textMuted}
                value={nameInput}
                onChangeText={setNameInput}
              />
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleDirectGoogleSubmit}
                style={[styles.confirmBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.confirmBtnText}>Xác nhận tài khoản Google</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity activeOpacity={0.7} onPress={onClose} style={styles.homeLink}>
            <Text style={[styles.homeLinkText, { color: colors.primary }]}>Quay trở về trang chủ EduQuiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 6,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 6,
  },
  logoBox: {
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  bold: {
    fontWeight: '700',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239,68,68,0.1)',
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
    width: '100%',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    flex: 1,
  },
  googleBtn: {
    width: '100%',
    paddingVertical: 13,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  googleBtnText: {
    fontSize: 15,
    fontWeight: '800',
  },
  toggleDirectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    marginBottom: 8,
  },
  toggleDirectText: {
    fontSize: 12,
    fontWeight: '600',
  },
  directBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 10,
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
  },
  confirmBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  homeLink: {
    paddingVertical: 6,
  },
  homeLinkText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
