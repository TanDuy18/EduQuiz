import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface HowStepProps {
  num: number;
  colorClass: 'green' | 'violet' | 'blue';
  title: string;
  desc: string;
}

export default function HowStep({ num, colorClass, title, desc }: HowStepProps) {
  const { colors, isDark } = useTheme();

  const bgMap = {
    green: { bg: isDark ? 'rgba(16,185,129,0.15)' : '#ecfdf5', text: '#10b981' },
    violet: { bg: isDark ? 'rgba(139,92,246,0.15)' : '#f5f3ff', text: '#8b5cf6' },
    blue: { bg: isDark ? 'rgba(59,130,246,0.15)' : '#eff6ff', text: '#3b82f6' },
  };
  const theme = bgMap[colorClass] || bgMap.blue;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      <View style={[styles.numCircle, { backgroundColor: theme.bg }]}>
        <Text style={[styles.numText, { color: theme.text }]}>{num}</Text>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.desc, { color: colors.textMuted }]}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginVertical: 6,
    flex: 1,
  },
  numCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  numText: {
    fontSize: 16,
    fontWeight: '800',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
