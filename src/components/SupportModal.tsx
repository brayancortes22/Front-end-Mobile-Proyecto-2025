/**
 * Modal de Soporte
 * @param {boolean} visible - Si el modal está visible
 * @param {() => void} onClose - Función para cerrar el modal
 * @returns {JSX.Element} Modal con información de soporte SENA
 */
import React from "react";
import GenericModal from "./ui/GenericModal";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { supportModalStyles as styles } from "../styles/SupportModal.styles";
import BSIcon from "./ui/BSIcon";

interface SupportModalProps {
  visible: boolean;
  onClose: () => void;
}


export const SupportModal: React.FC<SupportModalProps> = ({
  visible,
  onClose,
}) => {
  const content = (
    <View style={styles.contentInner}>
      <View style={styles.header}>
        <View style={styles.headerPill}>
         <BSIcon name="help" size={50} color="#43A047" />
        </View>
        <Text style={styles.title}>Centro de Soporte</Text>
        <Text style={styles.subtitle}>
          Estamos aquí para ayudarte. Encuentra respuestas rápidas o contáctanos
          directamente.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Formas de contactarnos</Text>

      {/* Contact cards */}
      <View style={styles.cardList}>
        <View style={styles.card}>
          <View style={styles.cardIconWrapper}>
            <Text style={styles.cardIcon}>✉️</Text>
          </View>
          <Text style={styles.cardTitle}>Email</Text>
          <Text style={styles.cardDesc}>Soporte por correo electrónico</Text>
          <Text style={styles.cardContact}>servicio@sena.edu.co</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>Respuesta en 24-48 horas</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIconWrapper}>
            <Text style={styles.cardIcon}>📞</Text>
          </View>
          <Text style={styles.cardTitle}>Teléfono</Text>
          <Text style={styles.cardDesc}>Línea gratuita nacional</Text>
          <Text style={styles.cardContact}>01 8000 910 270</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>
              Lunes a viernes: 7:00 AM - 7:00 PM
            </Text>
          </View>
        </View>
      </View>

      {/* Horarios de Atención */}
      <View style={styles.hoursCard}>
        <Text style={styles.hoursTitle}>Horarios de Atención</Text>
        <View style={styles.hoursRow}>
          <Text style={styles.hoursLabel}>Lunes a viernes</Text>
          <Text style={styles.hoursValue}>7:00 AM - 7:00 PM</Text>
        </View>
        <View style={styles.hoursRow}>
          <Text style={styles.hoursLabel}>Sábados</Text>
          <Text style={styles.hoursValue}>8:00 AM - 4:00 PM</Text>
        </View>
        <View style={styles.hoursRow}>
          <Text style={styles.hoursLabel}>Domingos y festivos</Text>
          <Text style={styles.hoursClosed}>Cerrado</Text>
        </View>
        <View style={styles.hoursNote}>
          <Text style={styles.hoursNoteText}>
            Nota: Los tiempos de respuesta pueden variar durante periodos de
            alta demanda como inscripciones masivas.
          </Text>
        </View>
      </View>

      {/* Envíanos un Mensaje - simple form */}
      <View style={styles.formCard}>
        <View style={styles.formHeader}>
          <Text style={styles.formHeaderTitle}>Envíanos un Mensaje</Text>
        </View>
        <TextInput
          placeholder="Nombre completo *"
          style={styles.input}
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          placeholder="Correo Electrónico *"
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          placeholder="Categoría de Consulta"
          style={styles.input}
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          placeholder="Mensaje *"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholderTextColor="#9E9E9E"
        />
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Enviar Mensaje</Text>
        </TouchableOpacity>
      </View>

      {/* Enlaces Útiles */}
      <View style={styles.linksCard}>
        <Text style={styles.linksTitle}>Enlaces Útiles</Text>
        <View style={styles.linkRow}>
          <Text style={styles.linkText}>Sofía Plus - Oferta Educativa</Text>
        </View>
        <View style={styles.linkRow}>
          <Text style={styles.linkText}>Portal Institucional SENA</Text>
        </View>
      </View>
    </View>
  );

  return (
    <GenericModal
      visible={visible}
      onClose={onClose}
      title=""
      content={content}
    />
  );
};

export default SupportModal;
