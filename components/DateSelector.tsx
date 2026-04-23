import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

interface Props {
  dates: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function DateSelector({ dates, selectedIndex, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {dates.map((date, index) => {
        const [day, num] = date.split(' ');
        const isActive = index === selectedIndex;
        return (
          <TouchableOpacity
            key={date}
            style={[styles.card, isActive && styles.selectedCard]}
            onPress={() => onSelect(index)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dayText, isActive && styles.selectedText]}>{day}</Text>
            <Text style={[styles.dateText, isActive && styles.selectedText]}>{num}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
  },
  card: {
    width: 62,
    height: 75,
    borderRadius: Radius.md,
    backgroundColor: '#FAEAEC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCard: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  dayText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8E7E82',
    marginBottom: 4,
  },
  dateText: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  selectedText: {
    color: Colors.white,
  },
});
