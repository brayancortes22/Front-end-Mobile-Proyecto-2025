import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SenaLogoProps {
  size?: number;
  showText?: boolean;
}

export const SenaLogo: React.FC<SenaLogoProps> = ({ size = 100, showText = true }) => (
  <View style={[styles.logo, { width: size, height: size }]}>  
    {/* Aquí puedes reemplazar por tu SVG o imagen real del logo SENA */}
    <View style={styles.circle} />
    {showText && <Text style={styles.text}>SENA</Text>}
  </View>
);

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#43A047',
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    color: '#43A047',
    fontWeight: 'bold',
  },
});

export default SenaLogo;
