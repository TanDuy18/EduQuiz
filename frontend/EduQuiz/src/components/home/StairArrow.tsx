import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function StairArrow() {
  return (
    <View style={styles.container}>
      <Feather name="arrow-right" size={20} color="#3b82f6" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
