/**
 * Modal de Soporte
 * @param {boolean} visible - Si el modal está visible
 * @param {() => void} onClose - Función para cerrar el modal
 * @returns {JSX.Element} Modal con información de soporte SENA
 */
import React from 'react';
import GenericModal from './ui/GenericModal';
import { View, Text, Image } from 'react-native';

interface SupportModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ visible, onClose }) => {
  const content = (
    <View>
      <Text style={{ fontSize: 16, color: '#424242', marginBottom: 8 }}>
        Estamos aquí para ayudarte. Encuentra respuestas rápidas o contáctanos directamente.
      </Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <Image source={{ uri: 'http://localhost:3845/assets/b7119a91028bc9dcfaf5ab73583d1673ae8a46c9.png' }} style={{ width: 80, height: 80 }} />
        <Image source={{ uri: 'http://localhost:3845/assets/b0dc56342333399c6d76e718bbb4a57e3604486c.png' }} style={{ width: 80, height: 80 }} />
      </View>
      <Text style={{ fontSize: 16, color: '#424242' }}>
        Correo: soporte@sena.edu.co{"\n"}
        Teléfono: 018000-910270{"\n"}
        Chat en línea: www.sena.edu.co/soporte
      </Text>
    </View>
  );

  return (
    <GenericModal visible={visible} onClose={onClose} title="Centro de Soporte" content={content} />
  );
};

export default SupportModal;
