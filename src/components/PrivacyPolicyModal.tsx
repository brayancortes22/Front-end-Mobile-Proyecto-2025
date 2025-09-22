import React from "react";
import GenericModal from "./ui/GenericModal";
import { View, Text } from "react-native";
import BSIcon from "./ui/BSIcon";
import { privacyPolicyModalStyles as styles } from "@/styles/PrivacyPolicyModal.styles";

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
  onAccept?: () => void;
  title?: string;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  visible,
  onClose,
  onAccept,
  title,
}) => {
  const content = (
    <View>
      <View style={styles.header}>
        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 100,
              backgroundColor: "#43A047",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BSIcon name="file-earmark-text" size={28} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <Text style={[styles.title, { textAlign: "center", marginBottom: 6 }]}>
        {title || "Política de Privacidad"}
      </Text>
      <Text
        style={[
          styles.title,
          {
            fontSize: 16,
            fontWeight: "400",
            color: "#757575",
            textAlign: "center",
            marginBottom: 12,
          },
        ]}
      >
        Cómo el SENA protege y utiliza su información personal
      </Text>

      <View style={styles.section}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
          1. Información que Recopilamos
        </Text>
        <Text style={styles.legalText}>
          1.1 Información Personal{`\n`}Recopilamos nombres, número de
          identificación, fecha de nacimiento, dirección, correo electrónico,
          número de teléfono, información académica y profesional, y datos
          socioeconómicos cuando aplique.
        </Text>
        <Text style={[styles.legalText, { marginTop: 8 }]}>
          1.2 Información Técnica{`\n`}También recopilamos dirección IP, tipo de
          navegador, sistema operativo, páginas visitadas y cookies para mejorar
          la experiencia y seguridad.
        </Text>
      </View>

      <View style={{ height: 8 }} />
      <View style={styles.section}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
          2. Cómo Utilizamos su Información
        </Text>
        <Text style={styles.legalText}>
          Utilizamos la información para la gestión de inscripciones,
          seguimiento académico, emisión de certificados, comunicación sobre
          cursos, verificación de identidad, gestión administrativa y mejora
          continua de los servicios.
        </Text>
      </View>

      <View style={{ height: 8 }} />

      <View style={styles.section}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
          3. Protección de sus Datos
        </Text>
        <Text style={styles.legalText}>
          Implementamos medidas técnicas (cifrado, firewalls, backups) y
          organizativas (políticas internas, capacitación, auditorías) para
          proteger sus datos personales.
        </Text>
      </View>

      <View style={{ height: 8 }} />

      <View style={styles.section}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
          4. Sus Derechos
        </Text>
        <Text style={styles.legalText}>
          Acceso, rectificación, actualización, supresión, oposición y
          portabilidad. Para ejercerlos, contáctenos mediante los canales
          indicados.
        </Text>
      </View>

      <View style={{ height: 8 }} />

      <View style={styles.section}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
          5. Compartir Información con Terceros
        </Text>
        <Text style={styles.legalText}>
          Podemos compartir información con entidades gubernamentales,
          proveedores de servicios, instituciones educativas y empleadores (con
          su consentimiento) cuando sea necesario y conforme a la ley.
        </Text>
      </View>

      <View style={{ height: 8 }} />

      <View style={styles.section}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
          6. Retención de Datos
        </Text>
        <Text style={styles.legalText}>
          Conservamos los datos durante el tiempo necesario para los fines
          recogidos (datos académicos de forma permanente para certificación,
          datos de contacto mientras exista relación, datos técnicos por 2 años,
          datos financieros según legislación).
        </Text>
      </View>

      <View style={{ height: 8 }} />

      <View style={styles.section}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
          7. Menores de Edad
        </Text>
        <Text style={styles.legalText}>
          Los menores pueden usar los servicios con consentimiento de
          padres/tutores; implementamos medidas adicionales de protección y
          verificación parental.
        </Text>
      </View>
    </View>
  );

  return (
    <GenericModal
      visible={visible}
      onClose={onClose}
      onAccept={onAccept}
      title={title || "Política de Privacidad"}
      content={content}
      acceptText="Aceptar"
    />
  );
};

export default PrivacyPolicyModal;
