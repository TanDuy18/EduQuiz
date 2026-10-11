import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface WhyCardProps {
  iconName?: keyof typeof Feather.glyphMap;
  iconColor?: string;
  colorClass?: 'green' | 'violet' | 'blue';
  title: string;
  desc: string;
  onPress?: () => void;
}

export default function WhyCard({
  iconName = 'check-circle',
  iconColor = '#2563eb',
  colorClass = 'blue',
  title,
  desc,
  onPress,
}: WhyCardProps) {
  const { colors, isDark } = useTheme();

  const bgMap = {
    green: isDark ? 'rgba(16,185,129,0.15)' : '#ecfdf5',
    violet: isDark ? 'rgba(139,92,246,0.15)' : '#f5f3ff',
    blue: isDark ? 'rgba(59,130,246,0.15)' : '#eff6ff',
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: bgMap[colorClass] || bgMap.blue }]}>
        <Feather name={iconName} size={24} color={iconColor} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.desc, { color: colors.textMuted }]}>{desc}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.arrowBtn, { backgroundColor: bgMap[colorClass] || bgMap.blue }]}
      >
        <Feather name="arrow-right" size={16} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  arrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
