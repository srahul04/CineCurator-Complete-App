import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

export default function ProfileScreen() {
  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', color: '#4B5563' },
    { icon: 'notifications-outline', label: 'Notifications', color: '#4B5563' },
    { icon: 'card-outline', label: 'Payments', color: '#4B5563' },
    { icon: 'shield-checkmark-outline', label: 'Security', color: '#4B5563' },
    { icon: 'help-circle-outline', label: 'Help & Support', color: '#4B5563' },
    { icon: 'log-out-outline', label: 'Logout', color: Colors.accent, action: () => router.replace('/login') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="camera" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Rahul S</Text>
          <Text style={styles.userEmail}>rahul.s@example.com</Text>
        </View>

        {/* Trending: CineGold Loyalty Card */}
        <View style={styles.loyaltyCard}>
          <ImageBackground 
            source={{ uri: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&auto=format&fit=crop' }}
            style={styles.loyaltyBg}
            imageStyle={{ borderRadius: Radius.lg }}
          >
            <View style={styles.loyaltyContent}>
              <View style={styles.loyaltyHeader}>
                <Text style={styles.loyaltyTitle}>CineGold Member</Text>
                <Ionicons name="sparkles" size={20} color="#FFD700" />
              </View>
              <View style={styles.loyaltyFooter}>
                <View>
                  <Text style={styles.pointsLabel}>CinePoints</Text>
                  <Text style={styles.pointsValue}>2,450</Text>
                </View>
                <TouchableOpacity style={styles.redeemButton}>
                  <Text style={styles.redeemText}>Redeem</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Watched</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
        </View>
        
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
          <View style={styles.activityCard}>
            <Ionicons name="eye-outline" size={20} color={Colors.accent} />
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>You viewed <Text style={styles.activityBold}>Pushpa 2</Text> details</Text>
              <Text style={styles.activityTime}>Just now</Text>
            </View>
          </View>
          <View style={styles.activityCard}>
            <Ionicons name="heart-outline" size={20} color={Colors.accent} />
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>Added <Text style={styles.activityBold}>Kanguva</Text> to watchlist</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem} 
              onPress={item.action}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon as any} size={22} color={item.color} />
              </View>
              <Text style={[styles.menuLabel, { color: item.color }]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
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
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/tickets')}>
          <Ionicons name="ticket-outline" size={24} color={Colors.textMuted} />
          <Text style={styles.tabLabel}>TICKETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.activeTabCircle}>
            <Ionicons name="person" size={24} color={Colors.white} />
          </View>
          <Text style={[styles.tabLabel, { color: Colors.accent }]}>PROFILE</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.accent,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  userName: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  loyaltyCard: {
    marginHorizontal: Spacing.md,
    height: 160,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    elevation: 8,
    shadowColor: '#A01D2A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  loyaltyBg: {
    flex: 1,
    overflow: 'hidden',
  },
  loyaltyContent: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: 'rgba(58, 26, 36, 0.7)', // Overlay
    justifyContent: 'space-between',
  },
  loyaltyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loyaltyTitle: {
    color: '#FFD700',
    fontSize: FontSize.lg,
    fontWeight: '900',
    letterSpacing: 1,
  },
  loyaltyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pointsLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pointsValue: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  redeemButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Radius.pill,
  },
  redeemText: {
    color: '#3A1A24',
    fontSize: 12,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: Spacing.xl,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '700',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  activitySection: {
    marginBottom: Spacing.xl,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: 8,
    gap: Spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 13,
    color: Colors.textPrimary,
  },
  activityBold: {
    fontWeight: '800',
    color: Colors.accent,
  },
  activityTime: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  menuSection: {
    paddingHorizontal: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '700',
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
