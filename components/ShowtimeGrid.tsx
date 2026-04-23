import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

interface Props {
  slots: string[];
  selected: string | null;
  onSelect: (slot: string) => void;
}

export default function ShowtimeGrid({ slots, selected, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {slots.map((slot) => {
        const isActive = slot === selected;
        return (
          <TouchableOpacity
            key={slot}
            style={[styles.slot, isActive && styles.activeSlot]}
            onPress={() => onSelect(slot)}
            activeOpacity={0.8}
          >
            <Text style={[styles.slotText, isActive && styles.activeSlotText]}>{slot}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  slot: {
    // 3 columns with gap
    width: '31%',
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSlot: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  slotText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  activeSlotText: {
    color: Colors.white,
    fontWeight: '700',
  },
});
