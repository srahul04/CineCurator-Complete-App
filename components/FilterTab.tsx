import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MovieCategory } from '../types';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

interface Props {
  label: MovieCategory;
  active: boolean;
  onPress: () => void;
}

export default function FilterTab({ label, active, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.tab, active && styles.activeTab]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: '#FAEAEC', // surface light pink
    marginRight: Spacing.sm,
  },
  activeTab: {
    backgroundColor: Colors.accent,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8E7E82', // text muted maroon
  },
  activeLabel: {
    color: Colors.white,
  },
});
