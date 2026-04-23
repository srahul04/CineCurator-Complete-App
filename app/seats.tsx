import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useBooking } from '../context/BookingContext';
import SeatGrid from '../components/SeatGrid';
import { BOOKED_SEATS, SEAT_PRICE } from '../data/movies';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

export default function SeatSelectionScreen() {
  const { booking, setSeats } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6];
  const bookedSet = new Set(BOOKED_SEATS);

  const toggleSeat = (seatId: string) => {
    if (bookedSet.has(seatId)) return;
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    setSeats(selectedSeats);
    router.push('/confirmation');
  };

  const totalPrice = selectedSeats.length * SEAT_PRICE;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CineCurator</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Movie Info Banner */}
        <View style={styles.movieBanner}>
          <View style={styles.miniPosterContainer}>
            <Image source={{ uri: booking.movie?.posterUrl }} style={styles.miniPoster} />
          </View>
          <View style={styles.movieBannerInfo}>
            <Text style={styles.bannerTitle}>{booking.movie?.title}</Text>
            <Text style={styles.bannerSubtitle}>Hall 4 · {booking.showtime}</Text>
          </View>
        </View>
        
        {/* Cinema Screen Indicator */}
        <View style={styles.screenIndicatorContainer}>
          <Text style={styles.screenText}>CINEMA SCREEN</Text>
          <View style={styles.screenCurve} />
        </View>

        {/* Seat Grid */}
        <View style={styles.gridContainer}>
          <SeatGrid
            rows={rows}
            cols={cols}
            bookedSeats={bookedSet}
            selectedSeats={selectedSeats}
            onToggle={toggleSeat}
          />
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.dotAvailable]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.dotBooked]} />
            <Text style={styles.legendText}>Booked</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.dotSelected]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Summary Strip */}
      <View style={styles.bottomStrip}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>TICKETS</Text>
            <Text style={styles.summaryValue}>{selectedSeats.length} Seats</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.summaryLabel}>TOTAL PRICE</Text>
            <Text style={styles.priceValue}>₹{totalPrice.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, selectedSeats.length === 0 && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={selectedSeats.length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // Light theme as per mockup
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
  movieBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    gap: Spacing.md,
  },
  miniPosterContainer: {
    width: 60,
    height: 60,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceLight,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  miniPoster: {
    width: '100%',
    height: '100%',
  },
  movieBannerInfo: {
    flex: 1,
  },
  bannerTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
  bannerSubtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  screenIndicatorContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  screenText: {
    color: '#D1D5DB', // Light gray
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  screenCurve: {
    width: '70%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  gridContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
    marginTop: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotAvailable: {
    backgroundColor: '#FAEAEC',
  },
  dotBooked: {
    backgroundColor: '#D1D5DB',
  },
  dotSelected: {
    backgroundColor: Colors.accent,
  },
  legendText: {
    color: '#6B7280',
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  bottomStrip: {
    backgroundColor: '#F9FAFB', // Very light gray bg
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  summaryLabel: {
    color: '#9CA3AF',
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  summaryValue: {
    color: '#111827',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  priceValue: {
    color: Colors.accent,
    fontSize: FontSize.xl,
    fontWeight: '800',
  },
  continueButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
});
