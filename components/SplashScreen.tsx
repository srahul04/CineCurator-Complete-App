import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stage 1: Initial Logo Pop
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Stage 2: Staggered Text Slide
    setTimeout(() => {
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }, 600);

    // Stage 3: Logo Idle Bounce
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoBounce, {
          toValue: -15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(logoBounce, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Finish
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Background Glows for a Colorful Feel */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <Animated.View style={[
        styles.content, 
        { 
          opacity: fadeAnim, 
          transform: [
            { scale: scaleAnim }, 
            { rotate: spin },
            { translateY: logoBounce }
          ] 
        }
      ]}>
        <View style={styles.logoWrapper}>
          <View style={styles.logoShadow} />
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="cover"
          />
        </View>
      </Animated.View>
      
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>Cine<Text style={styles.titleAccent}>Curator</Text></Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>PREMIUM MOVIE EXPERIENCES</Text>
      </Animated.View>

      <Animated.View style={[styles.loaderContainer, { opacity: fadeAnim }]}>
        <View style={styles.loaderBar}>
          <Animated.View style={styles.loaderFill} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0B0E', // Deep cinematic maroon/black
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    top: -height * 0.2,
    right: -width * 0.2,
    width: width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: '#A01D2A',
    opacity: 0.2,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -height * 0.1,
    left: -width * 0.2,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: '#D4AF37', // Gold glow
    opacity: 0.1,
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
  },
  logoWrapper: {
    width: 200,
    height: 200,
    borderRadius: 40,
    padding: 4,
    backgroundColor: '#D4AF37', // Gold border
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
  },
  logoShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#A01D2A',
    transform: [{ translateX: 8 }, { translateY: 8 }],
    opacity: 0.3,
  },
  textContainer: {
    marginTop: 40,
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  titleAccent: {
    color: '#D4AF37', // Golden Curator
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#A01D2A',
    marginVertical: 15,
    borderRadius: 2,
  },
  tagline: {
    fontSize: 12,
    color: '#D1C4C6',
    fontWeight: '800',
    letterSpacing: 4,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 60,
    width: '60%',
  },
  loaderBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#A01D2A',
  },
});
