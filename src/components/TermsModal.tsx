/**
 * Modal de Términos y Condiciones
 * @returns {JSX.Element} Modal con los términos y condiciones de uso
 * @example
 * <TermsModal visible={visible} onClose={handleClose} />
 */
import React from 'react';
import { View, Text, Image } from 'react-native';
import GenericModal from './ui/GenericModal';
import { termsModalStyles as styles } from '../styles/TermsModal.styles';
import BSIcon from '@/components/ui/BSIcon';
interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
  onAccept?: () => void;
  title?: string;
  content?: string | React.ReactNode;
}

export const TermsModal: React.FC<TermsModalProps> = ({ visible, onClose, onAccept, title, content }) => {
  const contentNode = (
    <View>
      <View style={styles.headerIcon}>
        <View style={styles.pillIcon}>
          <BSIcon name="journal-text" size={30} color="#43A047" />
        </View>
      </View>

      <Text style={styles.titleLarge}>Términos y Condiciones</Text>
      <Text style={styles.subtitle}>Condiciones de uso de los servicios del SENA - Servicio Nacional de Aprendizaje</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Aceptación de los Términos</Text>
        <Text style={styles.sectionText}>Al acceder y utilizar los servicios del SENA (Servicio Nacional de Aprendizaje), usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios. El SENA se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en este sitio web.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Descripción de los Servicios</Text>
        <Text style={styles.sectionText}>El SENA ofrece formación profesional integral gratuita en los siguientes servicios:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Programas de formación técnica y tecnológica</Text>
          <Text style={styles.listItem}>• Cursos complementarios virtuales y presenciales</Text>
          <Text style={styles.listItem}>• Servicios de empleabilidad y emprendimiento</Text>
          <Text style={styles.listItem}>• Plataformas educativas digitales (Sofia Plus, LMS SENA)</Text>
          <Text style={styles.listItem}>• Servicios de bienestar al aprendiz</Text>
          <Text style={styles.listItem}>• Certificación de competencias laborales</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Obligaciones del Usuario</Text>
        <Text style={styles.sectionText}>Los usuarios se comprometen a cumplir con requisitos de registro, mantener su información actualizada y comportarse de forma ética y profesional. No compartir contenido inapropiado o ofensivo y respetar derechos de propiedad intelectual.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Derechos de Propiedad Intelectual</Text>
        <Text style={styles.sectionText}>Todo el contenido disponible en las plataformas del SENA es propiedad del SENA o de sus proveedores y está protegido por las leyes de derechos de autor. Los usuarios pueden utilizar el contenido únicamente para fines educativos personales y no comerciales.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Protección de Datos Personales</Text>
        <Text style={styles.sectionText}>El SENA se compromete a proteger la privacidad de los usuarios conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Limitación de Responsabilidad</Text>
        <Text style={styles.sectionText}>El SENA no será responsable por daños que resulten del uso o la imposibilidad de uso de nuestros servicios.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Terminación del Servicio</Text>
        <Text style={styles.sectionText}>El SENA se reserva el derecho de suspender o terminar el acceso a sus servicios a cualquier usuario que viole estos términos y condiciones.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Ley Aplicable y Jurisdicción</Text>
        <Text style={styles.sectionText}>Estos términos y condiciones se rigen por las leyes de la República de Colombia. Cualquier disputa será sometida a la jurisdicción exclusiva de los tribunales competentes de Bogotá D.C., Colombia.</Text>
      </View>
    </View>
  );

  return (
    <GenericModal visible={visible} onClose={onClose} title={title || 'Términos y Condiciones'} content={content || contentNode} onAccept={onAccept} acceptText="Aceptar" />
  );
};

export default TermsModal;
