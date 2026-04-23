import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Barcode() {
  const lineCount = 28;
  const lines = Array.from({ length: lineCount }).map((_, i) => {
    let width = 1;
    if (i % 3 === 0) width = 3;
    if (i % 5 === 0) width = 2;
    if (i % 7 === 0) width = 4;
    return width;
  });

  return (
    <View style={styles.container}>
      {lines.map((width, i) => (
        <View key={i} style={[styles.line, { width }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: '100%',
    backgroundColor: '#1A1A2E',
  },
});
