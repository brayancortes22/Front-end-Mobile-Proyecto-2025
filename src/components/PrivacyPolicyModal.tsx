/**
 * Modal de Política de Privacidad
 * @param {boolean} visible - Si el modal está visible
 * @param {() => void} onClose - Función para cerrar el modal
 * @returns {JSX.Element} Modal con la política de privacidad SENA
 */
import React from 'react';
import GenericModal from './ui/GenericModal';
import { View, Text } from 'react-native';

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ visible, onClose }) => {
  const content = (
    <View>
      <Text style={{ fontSize: 16, color: '#424242', marginBottom: 8 }}>
        Tu privacidad es importante para nosotros. Los datos que nos compartes se usan para brindarte
        servicios relacionados con la plataforma. No compartiremos tu información con terceros sin tu
        consentimiento, salvo requerimiento legal.
      </Text>
      <Text style={{ fontSize: 16, color: '#424242', marginTop: 12 }}>
        Recopilamos correo electrónico, nombre, documento y números de contacto necesarios para
        autenticación y soporte técnico.
      </Text>
    </View>
  );

  return (
    <GenericModal visible={visible} onClose={onClose} title="Política de Privacidad" content={content} />
  );
};

export default PrivacyPolicyModal;
