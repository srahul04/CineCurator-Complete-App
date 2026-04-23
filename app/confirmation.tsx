import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useBooking } from '../context/BookingContext';
import Barcode from '../components/Barcode';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

export default function BookingConfirmationScreen() {
  const { booking, confirmBooking, resetBooking } = useBooking();
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    confirmBooking(); // Generates random #CNM-XXXXX ID
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDone = () => {
    resetBooking();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/movies')}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CineCurator</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Animated Checkmark */}
        <View style={styles.successHeader}>
          <Animated.View style={[styles.checkCircle, { transform: [{ scale: scaleAnim }] }]}>
            <Ionicons name="checkmark" size={40} color={Colors.white} />
          </Animated.View>
          <Text style={styles.heading}>Booking Confirmed!</Text>
          <Text style={styles.subtitle}>Your cinematic journey starts soon. Enjoy the show!</Text>
        </View>

        {/* Ticket Card */}
        <View style={styles.ticketCard}>
          {/* Ticket Banner: Large Poster with overlay */}
          <View style={styles.ticketBannerContainer}>
            <ImageBackground source={{ uri: booking.movie?.posterUrl }} style={styles.ticketBanner} imageStyle={styles.ticketBannerImage}>
              <View style={styles.bannerOverlay}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{booking.movie?.category.toUpperCase()}</Text>
                </View>
                <Text style={styles.bannerMovieTitle}>{booking.movie?.title}</Text>
              </View>
            </ImageBackground>
          </View>

          {/* Ticket Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>DATE & TIME</Text>
              <Text style={styles.detailValue}>{booking.date} ·</Text>
              <Text style={styles.detailValue}>{booking.showtime}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>CINEMA</Text>
              <Text style={styles.detailValue}>Grand Cineplex,</Text>
              <Text style={styles.detailValue}>Hall 4</Text>
            </View>
          </View>

          <View style={styles.detailsGridBottom}>
            <View style={styles.detailBoxFull}>
              <Text style={styles.detailLabel}>SELECTED SEATS</Text>
              <View style={styles.seatsRow}>
                {booking.selectedSeats.map(seat => (
                  <View key={seat} style={styles.seatPill}>
                    <Text style={styles.seatPillText}>{seat}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.detailBoxFull}>
              <Text style={styles.detailLabel}>BOOKING ID</Text>
              <Text style={styles.detailValue}>{booking.bookingId}</Text>
            </View>
          </View>

          {/* Dashed Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.holeLeft} />
            <View style={styles.dashedLine} />
            <View style={styles.holeRight} />
          </View>

          {/* Barcode Section */}
          <View style={styles.barcodeSection}>
            <Barcode />
            <Text style={styles.scanText}>SCAN AT ENTRANCE</Text>
          </View>
        </View>

        {/* Trending: Social Sharing & Actions */}
        <View style={styles.socialRow}>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={async () => {
              const { Share } = require('react-native');
              try {
                await Share.share({
                  message: `I just booked tickets for ${booking.movie?.title}! 🍿\nJoin me at ${booking.city} for the ${booking.showtime} show!`,
                });
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Ionicons name="share-social-outline" size={20} color={Colors.accent} />
            <Text style={styles.socialButtonText}>Invite Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="calendar-outline" size={20} color={Colors.accent} />
            <Text style={styles.socialButtonText}>Add to Calendar</Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleDone} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>Add to Apple Wallet</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F3', // Very light pink/cream background as per mockup
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    color: '#A01D2A',
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
  placeholder: {
    width: 32,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
    marginTop: Spacing.lg,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  heading: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: '#3A1A24',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: '#8E7E82',
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
    lineHeight: 22,
  },
  ticketCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  ticketBannerContainer: {
    width: '100%',
    height: 180,
  },
  ticketBanner: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  ticketBannerImage: {},
  bannerOverlay: {
    padding: Spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  categoryBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  categoryBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  bannerMovieTitle: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
  detailsGrid: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailsGridBottom: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  detailBox: {
    flex: 1,
  },
  detailBoxFull: {
    width: '100%',
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: '#3A1A24',
  },
  seatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  seatPill: {
    backgroundColor: '#FFF0F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  seatPillText: {
    color: Colors.accent,
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  holeLeft: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF0F3', // Match main bg
    marginLeft: -10,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  holeRight: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF0F3',
    marginRight: -10,
  },
  barcodeSection: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  scanText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1,
    marginTop: Spacing.md,
  },
  socialRow: {
    flexDirection: 'row',
    width: '100%',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.accentFaded,
    gap: 8,
  },
  socialButtonText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '800',
  },
  actionsContainer: {
    width: '100%',
    gap: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#F3E8EA',
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.accent,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
});
