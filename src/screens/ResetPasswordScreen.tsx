import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { resetPasswordScreenStyles as styles } from '../styles/ResetPasswordScreen.styles';

// Components
import { SenaLogo } from '../components/ui/SenaLogo';
import { BSIcon } from '../components/ui/BSIcon';

// Types
import { AuthStackParamList } from '../navigation/types';

// Utils
import { isValidSenaEmail } from '../utils/validations';

// Interfaces
interface ResetPasswordFormData {
  email: string;
}

type ResetPasswordScreenNavigationProp = NavigationProp<AuthStackParamList, 'ResetPassword'>;

const { width } = Dimensions.get('window');

export const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      
      // TODO: Integrar con la API de recuperación de contraseña
      console.log('Reset password request:', data);

      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Código Enviado',
        'Se ha enviado un código de recuperación a tu correo electrónico. Revisa tu bandeja de entrada.',
        [
          {
            text: 'Continuar',
            onPress: () => navigation.navigate('VerificationCode', { email: data.email }),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo enviar el código de recuperación. Por favor, intenta nuevamente.',
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

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.title}>Recuperar Contraseña</Text>
          <Text style={styles.description}>
            Ingresa tu correo electrónico para recibir un código de{'\n'}
            recuperación.
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'El correo electrónico es obligatorio',
              validate: {
                validSenaEmail: (value) =>
                  isValidSenaEmail(value) ||
                  'Debe ser un correo válido del SENA (@soy.sena.edu.co)',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label=""
                placeholder="ejemplo@soy.sena.edu.co"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                error={!!errors.email}
                style={styles.input}
                left={
                  <TextInput.Icon 
                    icon={() => (
                      <BSIcon 
                        name="envelope" 
                        size={20} 
                        color="#BDBDBD" 
                      />
                    )} 
                  />
                }
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                placeholderTextColor="#90A4AE"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            labelStyle={styles.submitButtonLabel}
            buttonColor="#388E3C"
          >
            Enviar Código
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
    </SafeAreaView>
  );
};

// ...existing code...