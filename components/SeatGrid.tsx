import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../constants/theme';

interface Props {
  rows: string[];
  cols: number[];
  bookedSeats: Set<string>;
  selectedSeats: string[];
  onToggle: (seatId: string) => void;
}

export default function SeatGrid({ rows, cols, bookedSeats, selectedSeats, onToggle }: Props) {
  return (
    <View style={styles.container}>
      {/* Column labels */}
      <View style={styles.row}>
        <View style={styles.rowLabelContainer} />
        {cols.map((col) => (
          <View key={col} style={styles.colLabelContainer}>
            <Text style={styles.label}>{col}</Text>
          </View>
        ))}
      </View>

      {rows.map((row, rowIndex) => (
        <View key={row} style={styles.row}>
          {/* Row labels */}
          <View style={styles.rowLabelContainer}>
            <Text style={styles.label}>{row}</Text>
          </View>
          
          {cols.map((col, colIndex) => {
            const seatId = `${row}${col}`;
            const isBooked = bookedSeats.has(seatId);
            const isSelected = selectedSeats.includes(seatId);

            return (
              <SeatItem
                key={seatId}
                seatId={seatId}
                isBooked={isBooked}
                isSelected={isSelected}
                onToggle={onToggle}
                delay={(rowIndex * cols.length + colIndex) * 15}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

function SeatItem({ seatId, isBooked, isSelected, onToggle, delay }: any) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      tension: 50,
      friction: 7,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  let seatStyle: any = styles.availableSeat;
  if (isBooked) seatStyle = styles.bookedSeat;
  else if (isSelected) seatStyle = styles.selectedSeat;

  return (
    <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
      <TouchableOpacity
        style={[styles.seat, seatStyle]}
        onPress={() => onToggle(seatId)}
        activeOpacity={isBooked ? 1 : 0.7}
      >
        {isSelected && (
          <Ionicons name="checkmark" size={16} color={Colors.white} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowLabelContainer: {
    width: 20,
    alignItems: 'center',
  },
  colLabelContainer: {
    width: 32,
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D1D5DB',
  },
  seat: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableSeat: {
    backgroundColor: '#FAEAEC', // light pink available seat
  },
  bookedSeat: {
    backgroundColor: '#D1D5DB', // gray booked seat
  },
  selectedSeat: {
    backgroundColor: Colors.accent, // red selected seat
  },
});
