/**
 * Modal de Política de Privacidad
 * @param {boolean} visible - Si el modal está visible
 * @param {() => void} onClose - Función para cerrar el modal
 * @returns {JSX.Element} Modal con la política de privacidad SENA
 */
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import { BSIcon } from '../components/ui/BSIcon';
import { privacyPolicyModalStyles as modalStyles } from '../styles/PrivacyPolicyModal.styles';

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modalContainer}>
          {/* Header con botón de cierre */}
          <View style={modalStyles.header}>
            <Pressable onPress={onClose} style={modalStyles.closeButton}>
              <BSIcon name="x" size={28} color="#757575" />
            </Pressable>
            <Text style={modalStyles.title}>Política de Privacidad</Text>
          </View>
          <ScrollView style={modalStyles.scrollContent}>
            {/* Contenido legal extraído del diseño Figma */}
            <Text style={modalStyles.legalText}>
              {`
Cómo el SENA protege y utiliza su información personal

1. Información que Recopilamos
1.1 Información Personal
Recopilamos la siguiente información personal cuando usted se registra o utiliza nuestros servicios:
- Nombres y apellidos completos
- Número de identificación (cédula, tarjeta de identidad, etc.)
- Fecha de nacimiento
- Dirección de residencia
- Correo electrónico
- Número de teléfono
- Información académica y profesional
- Estado socioeconómico (cuando aplique)
// Removed StyleSheet.create block as styles are now imported
- Auditorías regulares de seguridad
- Acuerdos de confidencialidad con terceros

4. Sus Derechos
De acuerdo con la Ley 1581 de 2012, usted tiene los siguientes derechos sobre sus datos personales:
- Acceso: Conocer qué datos tenemos sobre usted
- Rectificación: Corregir datos inexactos o incompletos
- Actualización: Mantener sus datos actualizados
- Supresión: Solicitar la eliminación de sus datos (cuando sea legalmente posible)
- Oposición: Oponerse al tratamiento de sus datos en ciertos casos
- Portabilidad: Obtener una copia de sus datos en formato estructurado

Para ejercer estos derechos, puede contactarnos a través de los canales indicados al final de esta política.

5. Compartir Información con Terceros
5.1 Entidades Gubernamentales
Con entidades del gobierno colombiano cuando sea requerido por ley o para cumplir con obligaciones regulatorias.
5.2 Proveedores de Servicios
Con proveedores de servicios tecnológicos que nos ayudan a operar nuestras plataformas, bajo estrictos acuerdos de confidencialidad.
5.3 Instituciones Educativas
Con otras instituciones educativas para fines de articulación académica y reconocimiento de estudios.
5.4 Empleadores
Con empleadores potenciales, con su consentimiento expreso, para fines de empleabilidad.

6. Retención de Datos
Conservamos sus datos personales durante el tiempo necesario para cumplir con los propósitos para los cuales fueron recopilados:
- Datos académicos: De forma permanente para efectos de certificación
- Datos de contacto: Mientras mantenga una relación activa con el SENA
- Datos técnicos: Por un período máximo de 2 años
- Datos financieros: Según lo requiera la legislación contable y tributaria

7. Menores de Edad
Los menores de edad pueden utilizar nuestros servicios con el consentimiento de sus padres o tutores legales. Implementamos medidas adicionales de protección para los datos de menores:
- Verificación del consentimiento parental
- Limitación en la recopilación de datos personales
- Supervisión adicional en el procesamiento de datos
- Derechos especiales de eliminación de datos
`}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 24,
    width: Math.min(width - 32, 420),
    maxHeight: '80%',
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43A047',
    flex: 1,
  },
  scrollContent: {
    maxHeight: 320,
  },
  legalText: {
    fontSize: 15,
    color: '#424242',
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default PrivacyPolicyModal;
