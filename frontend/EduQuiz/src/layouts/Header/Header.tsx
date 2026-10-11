import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../components/logo/Logo';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  activeRoute?: string;
  onNavigate?: (route: string) => void;
  onSearchPress?: () => void;
}

export default function Header({
  activeRoute = '/',
  onNavigate,
  onSearchPress,
}: HeaderProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  const isDesktop = width >= 768;

  const navItems = [
    { route: '/', label: 'Trang chủ' },
    { route: '/exam', label: 'Đề thi' },
    { route: '/practice', label: 'Luyện tập' },
  ];

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: Math.max(insets.top, 8),
          backgroundColor: colors.headerBg,
          borderBottomColor: colors.headerBorder,
        },
      ]}
    >
      <View style={styles.inner}>
        {/* Logo */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => onNavigate?.('/')}>
          <Logo />
        </TouchableOpacity>

        {/* Desktop Nav - Ẩn trên mobile để không chiếm chỗ */}
        {isDesktop && (
          <View style={styles.webNav}>
            {navItems.map((item) => {
              const isActive = activeRoute === item.route;
              return (
                <TouchableOpacity
                  key={item.route}
                  activeOpacity={0.7}
                  onPress={() => onNavigate?.(item.route)}
                  style={[
                    styles.webNavItem,
                    isActive && { backgroundColor: colors.primaryLight },
                  ]}
                >
                  <Text
                    style={[
                      styles.webNavText,
                      { color: isActive ? colors.primary : colors.textMuted },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Right Actions: Theme Toggle + Search + User */}
        <View style={styles.actions}>
          {/* Nút Dark/Light Mode */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleTheme}
            style={[styles.iconBtn, { backgroundColor: colors.chipBg }]}
          >
            <Feather
              name={isDark ? 'sun' : 'moon'}
              size={18}
              color={isDark ? '#fbbf24' : '#64748b'}
            />
          </TouchableOpacity>

          {/* Nút Tìm kiếm */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSearchPress}
            style={[styles.iconBtn, { backgroundColor: colors.chipBg }]}
          >
            <Feather name="search" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          {/* User Badge / Đăng nhập */}
          {user ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onNavigate?.('/profile')}
              style={[styles.userBadge, { backgroundColor: colors.chipBg }]}
            >
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Text style={styles.avatarText}>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</Text>
              </View>
              {isDesktop && (
                <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
                  {user.name}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onNavigate?.('/login')}
              style={[styles.loginBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.loginText}>Đăng nhập</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    zIndex: 10,
  },
  inner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  webNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  webNavItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  webNavText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    maxWidth: 100,
  },
  loginBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
