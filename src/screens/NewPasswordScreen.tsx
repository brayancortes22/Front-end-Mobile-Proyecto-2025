import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { newPasswordScreenStyles as styles } from '../styles/NewPasswordScreen.styles';

// Components
import { SenaLogo } from '../components/ui/SenaLogo';
import { BSIcon } from '../components/ui/BSIcon';

// Types
import { AuthStackParamList } from '../navigation/types';

// Utils
import { isValidPassword } from '../utils/validationlogin';

// Interfaces
interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

type NewPasswordScreenNavigationProp = NavigationProp<AuthStackParamList, 'NewPassword'>;
type NewPasswordScreenRouteProp = RouteProp<AuthStackParamList, 'NewPassword'>;

const { width } = Dimensions.get('window');

export const NewPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NewPasswordScreenNavigationProp>();
  const route = useRoute<NewPasswordScreenRouteProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Obtener parámetros de navegación
  const { email, code } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NewPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: NewPasswordFormData) => {
    try {
      setIsLoading(true);
      
      // TODO: Integrar con la API para actualizar contraseña
      console.log('New password data:', {
        email,
        code,
        newPassword: data.password,
      });

      // Simular actualización de contraseña
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Contraseña Actualizada',
        'Tu contraseña ha sido actualizada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.',
        [
          {
            text: 'Ir a Inicio de Sesión',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo actualizar la contraseña. Por favor, intenta nuevamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  const handleSupport = () => {
    Alert.alert(
      'Soporte',
      'Para obtener ayuda adicional, contacta al soporte técnico del SENA.',
      [{ text: 'OK' }]
    );
  };

  const handleTerms = () => {
    Alert.alert(
      'Términos de Uso',
      'Consulta los términos de uso en el portal oficial del SENA.',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      'Política de Privacidad',
      'Consulta la política de privacidad en el portal oficial del SENA.',
      [{ text: 'OK' }]
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const buttonFontSize = Math.min(22, Math.max(14, Math.floor(width / 16)));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
        {/* Header con botón de regreso */}
        <Pressable
          style={styles.backButton}
          onPress={handleBackToLogin}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <BSIcon 
            name="arrow-left" 
            size={16} 
            color="#FFFFFF" 
          />
          <Text style={styles.backButtonText}>Volver a inicio de sesión</Text>
        </Pressable>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <SenaLogo size={100} showText={false} />
        </View>

        {/* Título de la aplicación */}
        <Text style={styles.appTitle}>AutoGestión CIES</Text>

        {/* Título y descripción */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Actualizar Contraseña</Text>
          <Text style={styles.description}>
            Ingresa tu nueva contraseña
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          {/* Nueva contraseña */}
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'La contraseña es obligatoria',
              validate: {
                validPassword: (value) =>
                  isValidPassword(value) ||
                  'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label=""
                placeholder="Nueva contraseña"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                error={!!errors.password}
                style={styles.input}
                left={
                  <TextInput.Icon 
                    icon={() => (
                      <BSIcon 
                        name="lock" 
                        size={20} 
                        color="#BDBDBD" 
                      />
                    )} 
                  />
                }
                
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                placeholderTextColor="#757575"
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          {/* Confirmar nueva contraseña */}
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Debes confirmar la contraseña',
              validate: {
                matchPassword: (value) =>
                  value === passwordValue || 'Las contraseñas no coinciden',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label=""
                placeholder="Confirmar nueva contraseña"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                error={!!errors.confirmPassword}
                style={styles.input}
                left={
                  <TextInput.Icon 
                    icon={() => (
                      <BSIcon 
                        name="lock" 
                        size={20} 
                        color="#BDBDBD" 
                      />
                    )} 
                  />
                }
                
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                placeholderTextColor="#757575"
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            labelStyle={[styles.submitButtonLabel, { fontSize: buttonFontSize }]}
            buttonColor="#388E3C"
          >
            Actualizar contraseña
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable onPress={handleSupport}>
            <Text style={styles.footerLink}>Soporte</Text>
          </Pressable>
          <Pressable onPress={handleTerms}>
            <Text style={styles.footerLink}>Términos de Uso</Text>
          </Pressable>
          <Pressable onPress={handlePrivacy}>
            <Text style={styles.footerLink}>Política de Privacidad</Text>
          </Pressable>
        </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ...existing code...