import React from 'react';
import { View, Text, Image, StyleSheet, ImageStyle, ViewStyle } from 'react-native';

interface SenaLogoProps {
  size?: number;
  showText?: boolean;
  style?: ViewStyle | ImageStyle;
}

export const SenaLogo: React.FC<SenaLogoProps> = ({ size = 100, showText = true, style }) => {
  const logoSize = { width: size, height: size };
  // ruta relativa desde src/components/ui -> proyecto_root/assets/images
  const logo = require('../../../assets/images/logoSenaVerde.png');

  return (
    <View style={[styles.container, style]}>
      <Image source={logo} style={[styles.logo, logoSize]} resizeMode="contain" />
      {showText && <Text style={styles.text}>AutoGestión CIES</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
  },
  text: {
    marginTop: 8,
    fontSize: 24,
    color: '#43A047',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default SenaLogo;
