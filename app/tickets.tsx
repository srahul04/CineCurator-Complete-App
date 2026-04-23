import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBooking } from '../context/BookingContext';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

export default function TicketsScreen() {
  const { booking } = useBooking();
  const hasTicket = booking.bookingId && booking.movie;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tickets</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {hasTicket ? (
          <TouchableOpacity 
            style={styles.ticketCard} 
            activeOpacity={0.9}
            onPress={() => router.push('/confirmation')}
          >
            <View style={styles.ticketMain}>
              <Image 
                source={{ uri: booking.movie?.posterUrl }} 
                style={styles.movieThumb} 
              />
              <View style={styles.ticketInfo}>
                <Text style={styles.movieTitle}>{booking.movie?.title}</Text>
                <Text style={styles.dateTime}>{booking.date} · {booking.showtime}</Text>
                <Text style={styles.cinemaName}>Grand Cineplex, Hall 4</Text>
                <View style={styles.seatRow}>
                  <Text style={styles.seatLabel}>Seats:</Text>
                  <Text style={styles.seatValue}> {booking.selectedSeats.join(', ')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.divider}>
              <View style={styles.dot} />
              <View style={styles.dashedLine} />
              <View style={styles.dot} />
            </View>
            <View style={styles.ticketFooter}>
              <Text style={styles.bookingId}>ID: {booking.bookingId}</Text>
              <TouchableOpacity style={styles.viewButton} onPress={() => router.push('/confirmation')}>
                <Text style={styles.viewButtonText}>View QR Code</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="ticket-outline" size={48} color={Colors.accent} />
            </View>
            <Text style={styles.emptyTitle}>No Active Tickets</Text>
            <Text style={styles.emptySubtitle}>You haven't booked any movies yet. Explore the latest blockbusters and start your journey!</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={() => router.push('/movies')}>
              <Text style={styles.exploreButtonText}>Explore Movies</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Tab Bar Placeholder */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/movies')}>
          <Ionicons name="film-outline" size={24} color={Colors.textMuted} />
          <Text style={styles.tabLabel}>MOVIES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/cinemas')}>
          <Ionicons name="videocam-outline" size={24} color={Colors.textMuted} />
          <Text style={styles.tabLabel}>CINEMAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.activeTabCircle}>
            <Ionicons name="ticket" size={24} color={Colors.white} />
          </View>
          <Text style={[styles.tabLabel, { color: Colors.accent }]}>TICKETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
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
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 120,
  },
  ticketCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: Spacing.md,
  },
  ticketMain: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  movieThumb: {
    width: 80,
    height: 110,
    borderRadius: Radius.sm,
  },
  ticketInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  dateTime: {
    fontSize: FontSize.sm,
    color: Colors.accent,
    fontWeight: '700',
    marginTop: 4,
  },
  cinemaName: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  seatRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  seatLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  seatValue: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    marginHorizontal: -8,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderStyle: 'dashed',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
  },
  bookingId: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '800',
  },
  viewButton: {
    backgroundColor: Colors.accentFaded,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.sm,
  },
  viewButtonText: {
    color: Colors.accent,
    fontSize: 11,
    fontWeight: '800',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: Spacing.xl,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.accentFaded,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  exploreButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
  },
  exploreButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
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
