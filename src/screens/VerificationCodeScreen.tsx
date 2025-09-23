import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

// Components
import SenaLogo from '../components/SenaLogo';
import { verifyResetCode } from '../Api/Services/User';
import { BSIcon } from '../components/ui/BSIcon';
import TermsModal from '../components/TermsModal';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import SupportModal from '../components/SupportModal';

// Types
import { AuthStackParamList } from '../navigation/types';

// Interfaces
interface VerificationCodeFormData {
  code: string;
}

type VerificationCodeScreenNavigationProp = NavigationProp<AuthStackParamList, 'VerificationCode'>;
type VerificationCodeScreenRouteProp = RouteProp<AuthStackParamList, 'VerificationCode'>;

const { width } = Dimensions.get('window');

export const VerificationCodeScreen: React.FC = () => {
  const navigation = useNavigation<VerificationCodeScreenNavigationProp>();
  const route = useRoute<VerificationCodeScreenRouteProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title?: string; content?: React.ReactNode }>({});
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  

  // Obtener el email desde los parámetros de navegación
  const email = route.params?.email || 'ejemplo@soy.sena.edu.co';

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<VerificationCodeFormData>({
    defaultValues: {
      code: '',
    },
  });

  const codeValue = watch('code');

  

  const onSubmit = async (data: VerificationCodeFormData) => {
    try {
      setIsLoading(true);
      const res = await verifyResetCode(email, data.code);
      if (res.success) {
        Alert.alert('Código Verificado', 'El código es correcto. Ahora puedes establecer una nueva contraseña.', [
          { text: 'Continuar', onPress: () => navigation.navigate('NewPassword', { email, code: data.code }) }
        ]);
      } else {
        Alert.alert('Código Incorrecto', res.message || 'El código ingresado no es válido. Por favor, verifica e intenta nuevamente.');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo verificar el código. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  

  const handleSupport = () => {
    setShowSupportModal(true);
  };

  const handleTerms = () => {
    setModalContent({ title: 'Términos de Uso', content: undefined });
    setShowTermsModal(true);
  };

  const handlePrivacy = () => {
    setShowPrivacyModal(true);
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
          onPress={handleBack}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <BSIcon 
            name="arrow-left" 
            size={16} 
            color="#FFFFFF" 
          />
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <SenaLogo size={100} showText={false} />
        </View>

        {/* Título de la aplicación */}
        <Text style={styles.appTitle}>AutoGestión CIES</Text>

        {/* Título y descripción */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Código de verificación</Text>
          <Text style={styles.description}>
            Ingresa tu código de recuperación que se te envio al correo electronico{' '}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="code"
            rules={{
              required: 'El código de verificación es obligatorio',
              minLength: {
                value: 6,
                message: 'El código debe tener 6 dígitos',
              },
              maxLength: {
                value: 6,
                message: 'El código debe tener 6 dígitos',
              },
              pattern: {
                value: /^\d{6}$/,
                message: 'El código debe contener solo números',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label=""
                placeholder="Código de recuperación"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                maxLength={6}
                error={!!errors.code}
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
          {errors.code && (
            <Text style={styles.errorText}>{errors.code.message}</Text>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading || codeValue.length !== 6}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            labelStyle={[styles.submitButtonLabel, { fontSize: buttonFontSize }]}
            buttonColor="#388E3C"
          >
            Verificar Código
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 19,
    paddingVertical: 43,
    alignItems: 'center',
    gap: 62,
  },
  backButton: {
    backgroundColor: '#43A047',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    minHeight: 40,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 36,
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
    color: '#43A047',
    letterSpacing: -0.6,
    lineHeight: 32,
    textAlign: 'center',
  },
  headerContainer: {
    width: Math.min(342, width - 38),
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
    color: '#424242',
    lineHeight: 36,
    width: '100%',
  },
  description: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    color: '#757575',
    lineHeight: 20,
    width: '100%',
  },
  emailHighlight: {
    color: 'rgba(0,0,0,0.87)',
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  inputOutline: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  inputContent: {
    paddingLeft: 52,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#757575',
  },
  errorText: {
    color: '#F44336',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'flex-start',
    marginTop: -35,
  },
  submitButton: {
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: 252,
  },
  submitButtonContent: {
    height: 50,
    paddingHorizontal: 10,
  },
  submitButtonLabel: {
    fontSize: 30,
    fontFamily: 'Roboto-SemiBold',
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 10,
  },
  footerLink: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    color: '#9E9E9E',
    lineHeight: 16,
  },
});


