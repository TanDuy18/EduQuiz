import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function Logo() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
        <Ionicons name="school" size={24} color={colors.primary} />
      </View>
      <Text style={[styles.text, { color: colors.text }]}>
        Edu<Text style={[styles.highlight, { color: colors.primary }]}>Quiz</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  highlight: {},
});
