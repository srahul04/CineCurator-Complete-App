import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { City } from '../types';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

interface Props {
  city: City;
  onPress: () => void;
  featured?: boolean;
}

// ─── Featured city card (big card with colored bg) ───────────────────────────
export default function CityCard({ city, onPress, featured = true }: Props) {
  if (featured) {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.featuredCard} onPress={onPress} activeOpacity={0.85}>
          {city.imageUrl ? (
            <ImageBackground source={{ uri: city.imageUrl }} style={styles.imageBg} resizeMode="cover">
              <View style={[styles.overlay, { backgroundColor: 'rgba(255, 240, 243, 0.75)' }]}>
                <Text style={styles.regionLabel}>{city.region}</Text>
                <Text style={styles.cityName}>{city.name}</Text>
              </View>
            </ImageBackground>
          ) : (
            <View style={[styles.imageBg, { backgroundColor: city.color }]}>
              <View style={[styles.overlay, { backgroundColor: 'rgba(255, 240, 243, 0.75)' }]}>
                <Text style={styles.regionLabel}>{city.region}</Text>
                <Text style={styles.cityName}>{city.name}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* FAB on Hyderabad card as per mockup */}
        {city.name === 'Hyderabad' && (
          <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
            <Ionicons name="locate" size={20} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // ─── "More Cities" list row ─────────────────────────────────────────────────
  return (
    <TouchableOpacity style={styles.listRow} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.listCityName}>{city.name}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: Spacing.md,
  },
  // Featured card
  featuredCard: {
    height: 100,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  imageBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  regionLabel: {
    fontSize: 10,
    color: '#A01D2A',
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  cityName: {
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
    fontWeight: '800',
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: -15,
    right: 15,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  // List row
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  listCityName: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
});
