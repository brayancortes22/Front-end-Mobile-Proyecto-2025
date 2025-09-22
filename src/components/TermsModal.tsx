/**
 * Modal de Términos y Condiciones
 * @returns {JSX.Element} Modal con los términos y condiciones de uso
 * @example
 * <TermsModal visible={visible} onClose={handleClose} />
 */
import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';

import { termsModalStyles as styles } from '../styles/TermsModal.styles';
import BSIcon from '@/components/ui/BSIcon';

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
  onAccept?: () => void;
  title?: string;
  content?: string | React.ReactNode;
}

const { width } = Dimensions.get('window');

export const TermsModal: React.FC<TermsModalProps> = ({ visible, onClose, onAccept, title, content }) => {
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
            <Text style={styles.title}>{title || 'Términos y Condiciones'}</Text>
          </View>
          <ScrollView style={styles.scrollContent}>
            {/* If content prop is provided render it, otherwise render default legal text */}
            {content ? (
              typeof content === 'string' ? (
                <Text style={styles.legalText}>{content}</Text>
              ) : (
                content
              )
            ) : (
              <Text style={styles.legalText}>
                {`
Bienvenido a la app SENA AutoGestión CIES. Al usar esta aplicación, aceptas los siguientes términos y condiciones:

1. Uso exclusivo para aprendices, instructores y personal autorizado SENA.
2. La información proporcionada debe ser verídica y actualizada.
3. Está prohibido compartir credenciales de acceso.
4. El SENA no se responsabiliza por el mal uso de la plataforma.
5. Para soporte, contacta a través de los canales oficiales.

Para más información, consulta la política de privacidad y los avisos legales en el portal oficial del SENA.

---

Política de Privacidad

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

1.2 Información Técnica
También recopilamos información técnica cuando utiliza nuestras plataformas:
- Dirección IP
- Tipo de navegador y versión
- Sistema operativo
- Páginas visitadas y tiempo de permanencia
- Cookies y tecnologías similares

2. Cómo Utilizamos su Información
2.1 Servicios Educativos
- Gestión de inscripciones y matrículas
- Seguimiento académico y evaluación
- Emisión de certificados y títulos
- Comunicación sobre programas y cursos

2.2 Servicios Administrativos
- Verificación de identidad
- Gestión de pagos (cuando aplique)
- Soporte técnico y atención al usuario
- Cumplimiento de obligaciones legales

2.3 Mejora de Servicios
- Análisis estadístico y de rendimiento
- Personalización de la experiencia educativa
- Desarrollo de nuevos programas formativos
- Investigación educativa institucional

3. Protección de sus Datos
3.1 Medidas Técnicas
- Cifrado de datos en tránsito y en reposo
- Firewalls y sistemas de detección de intrusiones
- Copias de seguridad regulares
- Actualizaciones de seguridad constantes
- Control de acceso basado en roles

3.2 Medidas Organizativas
- Políticas internas de manejo de datos
- Capacitación del personal en protección de datos
- Procedimientos de respuesta a incidentes
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
            )}
          </ScrollView>
          {/* Footer: botones de acción */}
          <View style={styles.footer}>
            <Button
              mode="contained"
              onPress={() => {
                if (onAccept) onAccept();
                else onClose();
              }}
              contentStyle={styles.acceptButtonContent}
              style={styles.acceptButton}
              labelStyle={styles.acceptButtonText}
            >
              Aceptar
            </Button>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ...existing code...

export default TermsModal;
