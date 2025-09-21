/**
 * Modal de Soporte
 * @param {boolean} visible - Si el modal está visible
 * @param {() => void} onClose - Función para cerrar el modal
 * @returns {JSX.Element} Modal con información de soporte SENA
 */
import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import { supportModalStyles as styles } from '../styles/SupportModal.styles';
import { BSIcon } from '../components/ui/BSIcon';

interface SupportModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const SupportModal: React.FC<SupportModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header con botón de cierre */}
          <View style={styles.header}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <BSIcon name="x" size={28} color="#757575" />
            </Pressable>
            <Text style={styles.title}>Centro de Soporte</Text>
          </View>
          <ScrollView style={styles.scrollContent}>
            <Text style={styles.subtitle}>Estamos aquí para ayudarte. Encuentra respuestas rápidas o contáctanos directamente.</Text>
            {/* Ejemplo de imágenes de contacto (puedes personalizar las URLs) */}
            <View style={styles.imagesContainer}>
              <Image source={{ uri: 'http://localhost:3845/assets/b7119a91028bc9dcfaf5ab73583d1673ae8a46c9.png' }} style={styles.image} />
              <Image source={{ uri: 'http://localhost:3845/assets/b0dc56342333399c6d76e718bbb4a57e3604486c.png' }} style={styles.image} />
            </View>
            <Text style={styles.sectionTitle}>Formas de contactarnos</Text>
            <View style={styles.imagesContainer}>
              <Image source={{ uri: 'http://localhost:3845/assets/854aaeb85976d55cbfa3c09c97ccbf3160478cbc.png' }} style={styles.imageSmall} />
              <Image source={{ uri: 'http://localhost:3845/assets/d9b623d07e161631935278bfe8f2f40d2b976ef3.png' }} style={styles.imageLarge} />
              <Image source={{ uri: 'http://localhost:3845/assets/cc7fe2ecb2da8c3d40e205291ee6efc4efb2c359.png' }} style={styles.imageSmall} />
            </View>
            <Text style={styles.contactText}>
              Correo: soporte@sena.edu.co{"\n"}
              Teléfono: 018000-910270{"\n"}
              Chat en línea: www.sena.edu.co/soporte
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
// ...existing code...

export default SupportModal;
