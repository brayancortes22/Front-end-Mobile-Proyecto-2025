import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BSIcon, SenaIcons } from './ui/BSIcon';
import { isSenaEmail, isValidPassword } from '../utils/validationlogin';
import SenaLogo from './SenaLogo';
import Button from './ui/Button';
import Input from './ui/Input';
import { NavigationProps } from '../Api/types/entities/user.types';
import PrivacyPolicyModal from '../screens/PrivacyPolicyModal';

interface LoginFormProps extends NavigationProps {
  onNavigate?: (view: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ navigation, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(!isSenaEmail(value) ? 'El correo debe ser institucional (@soy.sena.edu.co o @sena.edu.co)' : '');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(!isValidPassword(value) ? 'La contraseña debe tener al menos 8 caracteres.' : '');
  };

  const handleSubmit = async () => {
    if (emailError || passwordError) return;
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    
    try {
      const result = await validateLogin({ username: email, password });

      // Guardar datos del usuario y navegar al home
      if (result.user) {
        // Navegación exitosa al dashboard/home
        navigation.navigate('Home');
      }
    } catch (error: any) {
      Alert.alert(
        'Error de autenticación',
        error.message || 'Credenciales inválidas. Verifica tu correo y contraseña.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (onNavigate) {
      onNavigate('forgot-password');
    } else {
      navigation.navigate('ForgotPassword');
    }
  };

  const handleRegister = () => {
    if (onNavigate) {
      onNavigate('register');
    } else {
      navigation.navigate('Register');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <SenaLogo />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>
              Accede a tu cuenta institucional
            </Text>

            <Input
              label="Correo electrónico"
              value={email}
              onChangeText={handleEmailChange}
              placeholder="ejemplo@soy.sena.edu.co"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={emailError}
              leftIcon={<BSIcon name={SenaIcons.email} size={20} color="#757575" />}
            />

            <Input
              label="Contraseña"
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Ingresa tu contraseña"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              error={passwordError}
              leftIcon={<BSIcon name={SenaIcons.lock} size={20} color="#757575" />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <BSIcon 
                    name={showPassword ? SenaIcons.visibilityOff : SenaIcons.visibility} 
                    size={20} 
                    color="#757575" 
                  />
                </TouchableOpacity>
              }
            />

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <Button
              title="Iniciar Sesión"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading || !!emailError || !!passwordError}
              style={styles.loginButton}
            />

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                ¿No tienes cuenta?{' '}
              </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerLink}>
                  Regístrate aquí
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', marginTop: 16 }}>
              <TouchableOpacity onPress={() => setShowPrivacyModal(true)}>
                <Text style={{ color: '#43A047', fontSize: 14, textDecorationLine: 'underline' }}>
                  Política de Privacidad
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <PrivacyPolicyModal visible={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D5016',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 32,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#6AB344',
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#757575',
  },
  registerLink: {
    fontSize: 14,
    color: '#6AB344',
    fontWeight: '600',
  },
});

export default LoginForm;

async function validateLogin({ username, password }: { username: string; password: string; }) {
  // Simulación de validación
  if (username === 'ejemplo@soy.sena.edu.co' && password === '12345678') {
    return { user: { email: username, nombre: 'Usuario Ejemplo' } };
  } else {
    throw new Error('Credenciales inválidas');
  }
}
