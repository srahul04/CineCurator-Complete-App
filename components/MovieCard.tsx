import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { Movie } from '../types';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

interface Props {
  movie: Movie;
  onPress: () => void;
  index?: number;
}

export default function MovieCard({ movie, onPress, index = 0 }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 400,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  return (
    <Animated.View style={{ opacity: animatedValue, transform: [{ translateY }] }}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        {/* Poster */}
        <View style={[styles.poster, { backgroundColor: movie.posterColor }]}>
          {movie.posterUrl && (
            <Image source={{ uri: movie.posterUrl }} style={StyleSheet.absoluteFill} />
          )}
          {movie.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.genre}>{movie.genre}</Text>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>🕐 {movie.duration}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>⭐ {movie.rating}</Text>
        </View>
        <View style={[styles.categoryBadge]}>
          <Text style={styles.categoryText}>{movie.category}</Text>
        </View>
      </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  poster: {
    width: 100,
    height: 130,
    borderRadius: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  newBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
  },
  newBadgeText: {
    color: Colors.white,
    fontSize: FontSize.xs,
    fontWeight: '800',
    letterSpacing: 1,
  },
  info: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
  },
  genre: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  title: {
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 22,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  dot: {
    color: Colors.textMuted,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accentFaded,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  categoryText: {
    color: Colors.accent,
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
});
