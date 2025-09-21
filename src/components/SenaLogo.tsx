import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface SenaLogoProps {
  size?: number;
  showText?: boolean;
  style?: any;
}

/**
 * Componente del Logo SENA
 * 
 * @param size - Tamaño del logo en píxeles (por defecto 60)
 * @param showText - Si mostrar o no el texto "AutoGestión CIES" (por defecto true)
 * @param style - Estilos adicionales para el contenedor
 */
const SenaLogo: React.FC<SenaLogoProps> = ({ 
  size = 60, 
  showText = true, 
  style 
}) => {
  const logoSize = {
    width: size,
    height: size,
  };

  if (!showText) {
    // Solo mostrar el logo sin texto
    return (
      <View style={[styles.logoOnlyContainer, style]}>
        <Image 
          source={require('../../assets/images/logoSenaVerde.png')} 
          style={[styles.logoOnly, logoSize]}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {/* Logo SENA */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/logoSenaVerde.png')} 
          style={[styles.logo, logoSize]}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={styles.title}>AutoGestión CIES</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  logoContainer: {
    marginLeft: -16,
  },
  logoOnlyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 60,
  },
  logoOnly: {
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#43A047',
  },
});

export default SenaLogo;