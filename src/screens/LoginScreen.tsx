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
import { isSenaEmail, isValidPassword } from '../utils/validationlogin';
import TermsModal from '../components/TermsModal';
import { loginScreenStyles as styles } from '../styles/LoginScreen.styles';
import { validateInstitutionalLogin } from '../Api/Services/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
  navigation?: any;
}

/**
 * Pantalla de Inicio de Sesión - AutoGestión CIES
 * 
 * Implementación de la pantalla de login siguiendo el diseño de Figma
 * con los estándares de desarrollo SENA establecidos.
 */
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(!isSenaEmail(value) && value.length > 0 ? 
      'El correo debe ser institucional (@soy.sena.edu.co o @sena.edu.co)' : '');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(!isValidPassword(value) && value.length > 0 ? 
      'La contraseña debe tener al menos 8 caracteres.' : '');
  };

  const handleLogin = async () => {
    if (emailError || passwordError) return;
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const response = await validateInstitutionalLogin(email, password);
      if (response.access) {
        // Guardar el token en AsyncStorage
        await AsyncStorage.setItem('accessToken', response.access);
        Alert.alert('Bienvenido', 'Inicio de sesión exitoso');
        navigation?.navigate('Home');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation?.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation?.navigate('Register');
  };

  const handleSupport = () => {
    // Abrir modal con información de soporte
    setModalContent({
      title: 'Soporte',
      content: (
        <Text style={{ color: '#424242', fontSize: 16 }}>
          Para soporte técnico, por favor contacta a: soporte@sena.edu.co o llama al 01-8000-SENA.
        </Text>
      ),
    });
    setShowTermsModal(true);
  };

  const handleTermsOfUse = () => {
    setModalContent({ title: 'Términos de Uso', content: undefined });
    setShowTermsModal(true);
  };

  const handlePrivacyPolicy = () => {
    setModalContent({
      title: 'Política de Privacidad',
      content: (
        <Text style={{ color: '#424242', fontSize: 16 }}>
          Política de privacidad: la aplicación respeta tus datos personales y no los comparte sin tu consentimiento. Para más detalles visita el portal oficial.
        </Text>
      ),
    });
    setShowTermsModal(true);
  };

  const [modalContent, setModalContent] = useState<{ title?: string; content?: React.ReactNode }>({});

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
          {/* Logo SENA */}
          <View style={styles.logoContainer}>
            <SenaLogo size={100} showText={false} />
          </View>

          {/* Título de la aplicación */}
          <Text style={styles.appTitle}>AutoGestión CIES</Text>

          {/* Sección de Login */}
          <View style={styles.loginSection}>
            <Text style={styles.loginTitle}>Iniciar Sesión</Text>
            <Text style={styles.loginSubtitle}>
              Ingresa tus credenciales para acceder a tu cuenta.
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
              inputStyle={styles.input}
            />

            {/* Campo Contraseña */}
            <Input
              label=""
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="******************"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              error={passwordError}
              leftIcon={
                <BSIcon 
                  name={SenaIcons.lock} 
                  size={20} 
                  color="#BDBDBD" 
                />
              }
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <BSIcon 
                    name={showPassword ? SenaIcons.visibilityOff : SenaIcons.visibility} 
                    size={20} 
                    color="#BDBDBD" 
                  />
                </TouchableOpacity>
              }
              inputStyle={styles.input}
            />

            {/* Enlace ¿Olvidaste tu contraseña? */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            {/* Botón Iniciar Sesión */}
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading || !email || !password || !!emailError || !!passwordError}
              style={styles.loginButton}
              labelStyle={styles.loginButtonText}
            >
              Iniciar Sesión
            </Button>
          </View>

          {/* Enlace de Registro */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerPrompt}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>

          {/* Enlaces del Footer */}
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={handleSupport}>
              <Text style={styles.footerLink}>Soporte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTermsOfUse}>
              <Text style={styles.footerLink}>Términos de Uso</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePrivacyPolicy}>
              <Text style={styles.footerLink}>Política de Privacidad</Text>
            </TouchableOpacity>
          </View>
          <TermsModal
            visible={showTermsModal}
            onClose={() => setShowTermsModal(false)}
            onAccept={() => setShowTermsModal(false)}
            title={modalContent.title}
            content={modalContent.content}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ...existing code...

export default LoginScreen;
