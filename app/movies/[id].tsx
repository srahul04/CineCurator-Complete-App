import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBooking } from '../../context/BookingContext';
import DateSelector from '../../components/DateSelector';
import ShowtimeGrid from '../../components/ShowtimeGrid';
import { THEATER, SHOWTIMES, getNextSevenDays, MOVIES } from '../../data/movies';
import { Colors, Spacing, Radius, FontSize } from '../../constants/theme';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { booking, setMovie, setShowtime } = useBooking();
  
  // Prioritize movie from context if IDs match, otherwise look in mock data
  const movie = (booking.movie?.id === id) ? booking.movie : MOVIES.find(m => m.id === id);
  
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const dates = getNextSevenDays();

  if (!movie) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: Colors.textMuted }}>Movie details not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: Colors.accent }}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleSelectSeats = () => {
    if (!selectedShowtime) return;
    setShowtime(dates[selectedDateIdx], selectedShowtime);
    router.push('/seats');
  };

  // Parallax Header Animations
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [380, 280],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Back Button Floating */}
      <TouchableOpacity 
        style={styles.backButtonFloating} 
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.white} />
      </TouchableOpacity>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Animated Header & Poster */}
        <Animated.View style={[styles.posterContainer, { height: headerHeight, transform: [{ scale: headerScale }] }]}>
          <ImageBackground 
            source={{ uri: movie.posterUrl || '' }} 
            style={StyleSheet.absoluteFill}
            imageStyle={styles.posterHeroImage}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Movie Info */}
        <View style={styles.infoSection}>
          <Text style={styles.nowShowing}>NOW SHOWING</Text>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>⭐ {movie.rating}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.metaText}>{movie.genre}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.metaText}>{movie.duration}</Text>
          </View>
          {movie.description && (
            <Text style={styles.descriptionText} numberOfLines={4}>
              {movie.description}
            </Text>
          )}
        </View>

        {/* Theater Card */}
        <View style={styles.theaterCard}>
          <View style={styles.theaterHeader}>
            <View>
              <Text style={styles.theaterName}>{THEATER.name}</Text>
              <View style={styles.addressRow}>
                <Ionicons name="location-sharp" size={14} color={Colors.textMuted} />
                <Text style={styles.addressText}>{THEATER.address}</Text>
              </View>
            </View>
            <View style={styles.formatBadge}>
              <Text style={styles.formatText}>{THEATER.format}</Text>
            </View>
          </View>
        </View>

        {/* Date Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SELECT DATE</Text>
          <DateSelector
            dates={dates}
            selectedIndex={selectedDateIdx}
            onSelect={setSelectedDateIdx}
          />
        </View>

        {/* Showtimes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AVAILABLE SHOWTIMES</Text>
          <ShowtimeGrid
            slots={SHOWTIMES}
            selected={selectedShowtime}
            onSelect={setSelectedShowtime}
          />
        </View>

        {/* Global Reviews Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GLOBAL REVIEWS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reviewsScroll}>
            {[1, 2].map((item) => (
              <View key={item} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewUser}>
                    <Text style={styles.reviewerName}>Reviewer {item}</Text>
                    <Text style={styles.reviewDate}>2 days ago</Text>
                  </View>
                  <View style={styles.reviewRating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.reviewRatingText}>9.0</Text>
                  </View>
                </View>
                <Text style={styles.reviewText} numberOfLines={3}>
                  "The cinematic experience in this movie is world-class! A must watch for every Kollywood fan. The visuals and BGM are stunning."
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.trailerButton}
            onPress={async () => {
              const { getMovieTrailer } = require('../../services/youtube');
              const url = await getMovieTrailer(movie.title);
              if (url) {
                Linking.openURL(url);
              } else {
                alert('Trailer not available for this movie.');
              }
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="play-circle-outline" size={24} color={Colors.accent} />
            <Text style={styles.trailerButtonText}>Watch Trailer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !selectedShowtime && styles.buttonDisabled]}
            onPress={handleSelectSeats}
            disabled={!selectedShowtime}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Select Seats 🎭</Text>
          </TouchableOpacity>
        </View>

      </Animated.ScrollView>

      {/* Navigation Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => router.push('/movies')}>
          <View style={styles.activeTabCircle}>
            <Ionicons name="film" size={24} color={Colors.white} />
          </View>
          <Text style={[styles.tabLabel, { color: Colors.accent }]}>MOVIES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => router.push('/cinemas')}>
          <Ionicons name="videocam-outline" size={24} color={Colors.textMuted} />
          <Text style={styles.tabLabel}>CINEMAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => router.push('/tickets')}>
          <Ionicons name="ticket-outline" size={24} color={Colors.textMuted} />
          <Text style={styles.tabLabel}>TICKETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => router.push('/profile')}>
          <Ionicons name="person-outline" size={24} color={Colors.textMuted} />
          <Text style={styles.tabLabel}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  posterContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  posterHeroImage: {
    borderRadius: Radius.lg,
  },
  backButtonFloating: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    padding: Spacing.md,
    alignItems: 'flex-start',
  },
  nowShowing: {
    color: '#A01D2A',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: '900',
    marginBottom: Spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  metaText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  descriptionText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: Spacing.md,
  },
  dot: {
    color: Colors.textMuted,
  },
  theaterCard: {
    backgroundColor: Colors.accentFaded,
    marginHorizontal: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
  },
  theaterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  theaterName: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '800',
    marginBottom: 4,
  },
  formatBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  formatText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  reviewsScroll: {
    paddingRight: Spacing.md,
  },
  reviewCard: {
    width: 280,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewUser: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  reviewDate: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF9E5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  reviewRatingText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#B8860B',
  },
  reviewText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  trailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: Colors.accent,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    gap: 8,
    flex: 1,
  },
  trailerButtonText: {
    color: Colors.accent,
    fontSize: FontSize.md,
    fontWeight: '800',
  },
  button: {
    backgroundColor: Colors.accent,
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingBottom: 20,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  activeTabCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    marginTop: 2,
  },
});
