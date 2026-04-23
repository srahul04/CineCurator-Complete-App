import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBooking } from '../../context/BookingContext';
import MovieCard from '../../components/MovieCard';
import FilterTab from '../../components/FilterTab';
import { MOVIES as MOCK_MOVIES } from '../../data/movies';
import { MovieCategory, Movie } from '../../types';
import { Colors, Spacing, FontSize } from '../../constants/theme';
import { getTrendingMovies } from '../../services/trakt';

export default function MovieListingScreen() {
  const [activeFilter, setActiveFilter] = useState<MovieCategory>('All Films');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { booking, setMovie } = useBooking();

  // Smart Navigation Guard
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('CineCurator', 'What would you like to do?', [
          { text: 'Stay', style: 'cancel', onPress: () => null },
          { text: 'Go to Menu', onPress: () => router.replace('/home') },
          { text: 'Exit App', style: 'destructive', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getTrendingMovies();
      setMovies(data.length > 0 ? data : MOCK_MOVIES);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  const filters: MovieCategory[] = ['All Films', 'IMAX', 'Premiere', 'Indie'];

  const filteredMovies = activeFilter === 'All Films'
    ? movies
    : movies.filter(m => m.category === activeFilter);

  const handleMovieTap = (movie: Movie) => {
    setMovie(movie);
    router.push(`/movies/${movie.id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={16} color={Colors.accent} />
          <Text style={styles.locationText}>{booking.city || 'Select City'}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.headerLogo} resizeMode="contain" />
          <Text style={styles.headerLogoText}>CineCurator</Text>
        </View>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop' }} 
          style={styles.avatar} 
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Now Showing</Text>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {filters.map(filter => (
            <FilterTab
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text style={{ marginTop: 10, color: Colors.textMuted, fontWeight: '600' }}>Fetching Trending Movies...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <MovieCard 
              movie={item} 
              onPress={() => handleMovieTap(item)} 
              index={index}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Navigation Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <View style={styles.activeTabCircle}>
            <Ionicons name="film" size={24} color={Colors.white} />
          </View>
          <Text style={[styles.tabLabel, { color: Colors.accent }]}>MOVIES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/cinemas')} activeOpacity={0.7}>
          <Ionicons name="videocam-outline" size={24} color={Colors.textMuted} />
          <Text style={styles.tabLabel}>CINEMAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/tickets')} activeOpacity={0.7}>
          <Ionicons name="ticket-outline" size={24} color={Colors.textMuted} />
          <Text style={styles.tabLabel}>TICKETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')} activeOpacity={0.7}>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 100,
  },
  locationText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  headerLogo: {
    width: 22,
    height: 22,
  },
  headerLogoText: {
    color: '#A01D2A',
    fontSize: FontSize.lg,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.border,
  },
  titleContainer: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  filtersContainer: {
    marginBottom: Spacing.md,
  },
  filtersScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 100, // Room for tab bar
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
