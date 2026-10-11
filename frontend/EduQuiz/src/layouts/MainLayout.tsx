import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header/Header';
import BottomNav from './BottomNav';
import { useTheme } from '../context/ThemeContext';

interface MainLayoutProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export default function MainLayout({
  activeRoute,
  onNavigate,
  children,
}: MainLayoutProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bgSubtle }]}>
      <Header activeRoute={activeRoute} onNavigate={onNavigate} />
      <View style={styles.main}>{children}</View>
      <BottomNav activeRoute={activeRoute} onNavigate={onNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    maxWidth: 1024,
    width: '100%',
    alignSelf: 'center',
  },
});
