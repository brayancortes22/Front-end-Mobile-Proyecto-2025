import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BSIcon, SenaIcons } from '../components/ui/BSIcon';
import { Button } from 'react-native-paper';
import Input from '../components/ui/Input';
import SenaLogo from '../components/SenaLogo';
import { isSenaEmail } from '../utils/validationlogin';
import { forgotPasswordScreenStyles as styles } from '../styles/ForgotPasswordScreen.styles';
import TermsModal from '../components/TermsModal';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import SupportModal from '../components/SupportModal';

interface ForgotPasswordScreenProps {
  navigation?: any;
}

/**
 * Pantalla de Recuperar Contraseña - AutoGestión CIES
 * 
 * Permite al usuario solicitar un código de recuperación de contraseña
 * siguiendo el diseño de Figma y los estándares SENA.
 */
const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title?: string; content?: React.ReactNode }>({});
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(!isSenaEmail(value) && value.length > 0 ? 
      'El correo debe ser institucional (@soy.sena.edu.co o @sena.edu.co)' : '');
  };

  const handleSendCode = async () => {
    if (emailError || !email) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implementar llamada a la API de recuperación
      console.log('Enviando código a:', email);
      
      // Simulación de envío exitoso
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          'Código Enviado', 
          'Se ha enviado un código de recuperación a tu correo electrónico.',
          [
            {
              text: 'OK',
              onPress: () => navigation?.navigate('VerificationCode'),
            },
          ]
        );
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Error al enviar el código. Inténtalo de nuevo.');
    }
  };

  const handleBackToLogin = () => {
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Botón Volver al inicio de sesión */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToLogin}
          >
            <BSIcon name={SenaIcons.back} size={16} color="#E5E7EB" />
            <Text style={styles.backButtonText}>Volver a inicio de sesión</Text>
          </TouchableOpacity>

          {/* Logo SENA */}
          <View style={styles.logoContainer}>
            <SenaLogo size={100} showText={false} />
          </View>

          {/* Título de la aplicación */}
          <Text style={styles.appTitle}>AutoGestión CIES</Text>

          {/* Sección de Recuperar Contraseña */}
          <View style={styles.recoverySection}>
            <Text style={styles.recoveryTitle}>Recuperar Contraseña</Text>
            <Text style={styles.recoverySubtitle}>
              Ingresa tu correo electrónico para recibir un código de recuperación.
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Campo Email */}
            <Input
              label=""
              value={email}
              onChangeText={handleEmailChange}
              placeholder="ejemplo@soy.sena.edu.co"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={emailError}
              leftIcon={
                <BSIcon 
                  name={SenaIcons.email} 
                  size={20} 
                  color="#BDBDBD" 
                />
              }
              style={styles.input}
            />

            {/* Botón Enviar Código */}
            <Button
              mode="contained"
              onPress={handleSendCode}
              loading={loading}
              disabled={loading || !email || !!emailError}
              style={styles.sendButton}
              labelStyle={styles.sendButtonText}
            >
              Enviar Código
            </Button>
          </View>

          {/* Enlaces del Footer */}
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => setShowSupportModal(true)}>
              <Text style={styles.footerLink}>Soporte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setModalContent({ title: 'Términos de Uso', content: undefined });
              setShowTermsModal(true);
            }}>
              <Text style={styles.footerLink}>Términos de Uso</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setShowPrivacyModal(true);
            }}>
              <Text style={styles.footerLink}>Política de Privacidad</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TermsModal
          visible={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          onAccept={() => setShowTermsModal(false)}
          title={modalContent.title}
          content={modalContent.content}
        />
        <SupportModal
          visible={showSupportModal}
          onClose={() => setShowSupportModal(false)}
        />
        <PrivacyPolicyModal
          visible={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
          onAccept={() => setShowPrivacyModal(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ...existing code...

export default ForgotPasswordScreen;