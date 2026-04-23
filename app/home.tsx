import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useBooking } from '../context/BookingContext';
import CityCard from '../components/CityCard';
import { CITIES } from '../data/movies';
import { City } from '../types';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';
import { getAnticipatedMovies } from '../services/trakt';

export default function CitySelectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setCity } = useBooking();

  // Smart Navigation Guard
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('CineCurator', 'What would you like to do?', [
          { text: 'Stay', style: 'cancel', onPress: () => null },
          { text: 'Go to Menu', onPress: () => router.replace('/home') },
          { text: 'Exit App', style: 'destructive', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default behavior
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  useEffect(() => {
    const fetchUpcoming = async () => {
      const data = await getAnticipatedMovies();
      setUpcomingMovies(data);
      setLoading(false);
    };
    fetchUpcoming();
  }, []);

  const handleSelectCity = (city: City) => {
    setCity(city.name);
    router.push('/movies');
  };

  const filteredCities = CITIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const featuredCities = filteredCities.filter(c => c.featured);
  const moreCities = filteredCities.filter(c => !c.featured);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Ionicons name="location-sharp" size={20} color={Colors.accent} style={styles.headerIcon} />
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.headerLogo} resizeMode="contain" />
          <Text style={styles.headerLogoText}>CineCurator</Text>
        </View>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop' }} 
          style={styles.avatar} 
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Select City</Text>
        <Text style={styles.subtitle}>Choose your location to see movies playing near you.</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for your city..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.featuredContainer}>
          {featuredCities.map(city => (
            <CityCard key={city.id} city={city} featured onPress={() => handleSelectCity(city)} />
          ))}
        </View>

        {/* Upcoming Movies Section */}
        <View style={styles.upcomingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.moreCitiesTitle}>UPCOMING MOVIES</Text>
            <TouchableOpacity onPress={() => router.push('/upcoming')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator color={Colors.accent} style={{ marginVertical: 20 }} />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.upcomingScroll}>
              {upcomingMovies.map((movie) => (
                <View key={movie.id} style={styles.upcomingCard}>
                  <Image 
                    source={{ uri: movie.posterUrl }} 
                    style={styles.upcomingImage} 
                  />
                  <Text style={styles.upcomingTitle} numberOfLines={1}>{movie.title}</Text>
                  <Text style={styles.upcomingDate}>Release: {movie.releaseDate}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {moreCities.length > 0 && (
          <View style={styles.moreCitiesContainer}>
            <Text style={styles.moreCitiesTitle}>MORE CITIES</Text>
            {moreCities.map(city => (
              <CityCard key={city.id} city={city} featured={false} onPress={() => handleSelectCity(city)} />
            ))}
          </View>
        )}
      </ScrollView>
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
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  headerIcon: {
    width: 32,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  headerLogo: {
    width: 24,
    height: 24,
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
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.hero,
    fontWeight: '900',
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
    height: 50,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    height: '100%',
  },
  featuredContainer: {
    marginBottom: Spacing.xl,
  },
  moreCitiesContainer: {},
  moreCitiesTitle: {
    color: '#605054',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: Spacing.sm,
  },
  upcomingSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  viewAll: {
    color: Colors.accent,
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: Colors.accentFaded,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.accent,
    overflow: 'hidden',
    textAlign: 'center',
  },
  upcomingScroll: {
    paddingRight: Spacing.md,
  },
  upcomingCard: {
    width: 140,
    marginRight: Spacing.md,
  },
  upcomingImage: {
    width: 140,
    height: 190,
    borderRadius: Radius.lg,
    marginBottom: 8,
    backgroundColor: Colors.border,
  },
  upcomingTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '800',
  },
  upcomingDate: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});
