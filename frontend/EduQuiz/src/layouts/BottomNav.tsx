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
import { useTheme } from '../context/ThemeContext';

interface BottomNavProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
}

export default function BottomNav({ activeRoute, onNavigate }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();

  // Trên màn hình lớn (Desktop web), BottomNav ẩn vì đã có header nav
  if (width >= 768) {
    return null;
  }

  const navItems: Array<{ route: string; label: string; icon: keyof typeof Feather.glyphMap }> = [
    { route: '/', label: 'Trang chủ', icon: 'home' },
    { route: '/exam', label: 'Đề thi', icon: 'book-open' },
    { route: '/practice', label: 'Luyện tập', icon: 'target' },
    { route: '/profile', label: 'Cá nhân', icon: 'user' },
  ];

  return (
    <View
      style={[
        styles.bottomBar,
        {
          backgroundColor: colors.navBg,
          borderTopColor: colors.navBorder,
          paddingBottom: Math.max(8, insets.bottom),
        },
      ]}
    >
      <View style={styles.content}>
        {navItems.map((item) => {
          const isActive = activeRoute === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              activeOpacity={0.7}
              onPress={() => onNavigate(item.route)}
              style={styles.tabItem}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isActive && {
                    backgroundColor: colors.primaryLight,
                  },
                ]}
              >
                <Feather
                  name={item.icon}
                  size={20}
                  color={isActive ? colors.primary : colors.textMuted}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? colors.primary : colors.textMuted },
                  isActive && styles.tabLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    height: 54,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  tabLabelActive: {
    fontWeight: '700',
  },
});
