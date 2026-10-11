import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface LevelCardProps {
  iconName?: keyof typeof Feather.glyphMap;
  iconColor?: string;
  colorClass?: 'green' | 'violet' | 'blue';
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export default function LevelCard({
  iconName = 'book',
  iconColor = '#2563eb',
  colorClass = 'blue',
  title,
  subtitle,
  onPress,
}: LevelCardProps) {
  const { colors, isDark } = useTheme();

  const bgMap = {
    green: isDark ? 'rgba(16,185,129,0.15)' : '#ecfdf5',
    violet: isDark ? 'rgba(139,92,246,0.15)' : '#f5f3ff',
    blue: isDark ? 'rgba(59,130,246,0.15)' : '#eff6ff',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: bgMap[colorClass] || bgMap.blue }]}>
        <Feather name={iconName} size={22} color={iconColor} />
      </View>
      <View style={styles.textBox}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>
      </View>
      <Feather name="chevron-right" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
