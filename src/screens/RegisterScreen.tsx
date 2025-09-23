import React, { useState, useEffect } from 'react';
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
import { Checkbox, Button } from 'react-native-paper';
import { BSIcon, SenaIcons } from '../components/ui/BSIcon';
import Input from '../components/ui/Input';
import SenaLogo from '../components/SenaLogo';
import { isSenaEmail } from '../utils/validationlogin';
import TermsModal from '../components/TermsModal';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import SupportModal from '../components/SupportModal';
import { registerScreenStyles as styles } from '../styles/RegisterScreen.styles';
import { useValidators } from '../hooks/useValidators';
import { getDocumentTypesWithEmpty } from '../Api/Services/Enums';
import { registerAprendiz } from '../Api/Services/Person';
import { capitalizeWords } from '../utils/validationlogin';

interface RegisterScreenProps {
  navigation?: any;
}

/**
 * Pantalla de Crear Cuenta - AutoGestión CIES
 * 
 * Permite a los aprendices registrarse en la plataforma siguiendo
 * el diseño de Figma y los estándares SENA establecidos.
 */
const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
    firstName: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    phone: '',
  });
  
  const { validateField, validateForm: validateAllFields } = useValidators();
  
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDocumentPicker, setShowDocumentPicker] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title?: string; content?: React.ReactNode }>({});

  const [documentTypes, setDocumentTypes] = useState<{ label: string; value: string }[]>([]);
  const [loadingDocumentTypes, setLoadingDocumentTypes] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingDocumentTypes(true);
        const types = await getDocumentTypesWithEmpty();
        if (mounted && Array.isArray(types)) {
          setDocumentTypes(types as { label: string; value: string }[]);
        }
      } catch (err) {
        console.error('Error cargando tipos de documento:', err);
        // Fallback mínimo si el backend falla
        if (mounted) {
          setDocumentTypes([
            { label: 'Seleccione tipo de documento', value: '' },
            { label: 'Cédula de Ciudadanía', value: 'CC' },
            { label: 'Tarjeta de Identidad', value: 'TI' },
          ]);
        }
      } finally {
        if (mounted) setLoadingDocumentTypes(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Validación en tiempo real usando hook reutilizable
    const fieldError = validateField(field, value, { ...formData, [field]: value });
    setErrors(prev => ({ ...prev, [field]: fieldError }));
  };

  const validateForm = (): boolean => {
    const newErrors = validateAllFields(formData as any);
    // normalize undefined to empty strings for compatibility with UI
    const normalizedErrors: any = {};
    Object.keys(newErrors).forEach(k => { normalizedErrors[k] = newErrors[k] || ''; });
    setErrors(normalizedErrors);
    const values = Object.values(normalizedErrors).map(v => String(v));
    return !values.some((error) => error !== '');
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor completa todos los campos correctamente');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);
    try {
      // Mapear nombres y apellidos (capitalizar)
      const [first_name, ...restNames] = capitalizeWords((formData.firstName || '').trim()).split(' ');
      const second_name = restNames.join(' ');
      const [first_last_name, ...restSurnames] = capitalizeWords((formData.lastName || '').trim()).split(' ');
      const second_last_name = restSurnames.join(' ');

      const payload = {
        email: formData.email,
        first_name: first_name || '',
        second_name: second_name || undefined,
        first_last_name: first_last_name || '',
        second_last_name: second_last_name || undefined,
        type_identification: formData.documentType,
        number_identification: formData.documentNumber,
        phone_number: formData.phone,
        password: formData.documentNumber, // temporal: usar documento como password
      };

      const response = await registerAprendiz(payload as any);
      setLoading(false);
      Alert.alert(
        'Registro Exitoso',
        'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.',
        [
          { text: 'Ir al Login', onPress: () => navigation?.navigate('Login') }
        ]
      );
    } catch (err: any) {
      setLoading(false);
      console.error('Error registerAprendiz:', err);
      const serverMessage = err?.message || 'Error al crear la cuenta. Inténtalo de nuevo.';
      Alert.alert('Error', serverMessage);
    }
  };

  const handleBackToLogin = () => {
    navigation?.goBack();
  };

  const handleTermsPress = () => {
    setModalContent({ title: 'Términos y Condiciones', content: undefined });
    setShowTermsModal(true);
  };

  const handleSupportPress = () => {
    setShowSupportModal(true);
  };

  const handlePrivacyPress = () => {
    setShowPrivacyModal(true);
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

          {/* Logo y Título */}
          <View style={styles.headerContainer}>
            <SenaLogo size={80} showText={false} />
            <Text style={styles.appTitle}>AutoGestión CIES</Text>
          </View>

          {/* Sección de Crear Cuenta */}
          <View style={styles.titleSection}>
            <Text style={styles.registerTitle}>Crear cuenta</Text>
            <Text style={styles.registerSubtitle}>
              Ingresa tus datos para registrarte en la plataforma. Solo se deben registrar aprendices.
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Correo Institucional */}
            <Input
              label=""
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Correo institucional: ejemplo@soy.sena.edu.co"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email}
              leftIcon={
                <BSIcon 
                  name={SenaIcons.email} 
                  size={25} 
                  color="#BDBDBD" 
                />
              }
              containerStyle={styles.inputFullWidth}
            />

            {/* Nombres y Apellidos */}
            <View style={styles.rowContainer}>
              <Input
                label=""
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Nombres"
                autoCapitalize="words"
                error={errors.firstName}
                leftIcon={
                  <BSIcon 
                    name={SenaIcons.profile} 
                    size={20} 
                    color="#BDBDBD" 
                  />
                }
                containerStyle={styles.inputHalf}
              />
              
              <Input
                label=""
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Apellidos"
                autoCapitalize="words"
                error={errors.lastName}
                leftIcon={
                  <BSIcon 
                    name={SenaIcons.profile} 
                    size={20} 
                    color="#BDBDBD" 
                  />
                }
                containerStyle={styles.inputHalf}
              />
            </View>

            {/* Tipo de Documento */}
            <View style={styles.pickerWrapper}>
              <TouchableOpacity 
                style={styles.pickerContainer}
                onPress={() => setShowDocumentPicker(!showDocumentPicker)}
              >
                <Text style={[
                  styles.pickerText,
                  formData.documentType ? styles.pickerTextSelected : styles.pickerTextPlaceholder,
                ]}>
                  {loadingDocumentTypes
                    ? 'Cargando tipos...'
                    : (formData.documentType
                        ? documentTypes.find(type => type.value === formData.documentType)?.label
                        : (documentTypes.length > 0 ? documentTypes[0].label || 'Tipo de documento' : 'Tipo de documento')
                      )
                  }
                </Text>
                <BSIcon 
                  name={SenaIcons.keyboardArrowDown} 
                  size={16} 
                  color="#757575" 
                  style={showDocumentPicker ? styles.pickerIconRotated : {}} 
                />
              </TouchableOpacity>

              {showDocumentPicker && (
                <View style={styles.pickerDropdown}>
                  {loadingDocumentTypes ? (
                    <View style={styles.pickerOption}>
                      <Text style={styles.pickerOptionText}>Cargando...</Text>
                    </View>
                  ) : (
                    documentTypes.map((type, idx) => (
                      <TouchableOpacity
                        key={`${type.value}-${idx}`}
                        style={styles.pickerOption}
                        onPress={() => {
                          handleInputChange('documentType', type.value);
                          setShowDocumentPicker(false);
                        }}
                      >
                        <Text style={styles.pickerOptionText}>{type.label}</Text>
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              )}
            </View>

            {/* Número de Documento y Teléfono */}
            <View style={styles.rowContainer}>
              <Input
                label=""
                value={formData.documentNumber}
                onChangeText={(value) => handleInputChange('documentNumber', value)}
                placeholder="Numero de documento"
                keyboardType="numeric"
                error={errors.documentNumber}
                leftIcon={
                  <BSIcon 
                    name={SenaIcons.document} 
                    size={16} 
                    color="#BDBDBD" 
                  />
                }
                containerStyle={styles.inputHalf}
              />
              
              <Input
                label=""
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="Teléfono"
                keyboardType="phone-pad"
                error={errors.phone}
                leftIcon={
                  <BSIcon 
                    name={SenaIcons.phone} 
                    size={16} 
                    color="#BDBDBD" 
                  />
                }
                containerStyle={styles.inputHalf}
              />
            </View>

            {/* Términos y Condiciones */}
            <View style={styles.termsContainer}>
              <Checkbox
                status={acceptTerms ? 'checked' : 'unchecked'}
                onPress={() => setAcceptTerms(!acceptTerms)}
                color="#43A047"
              />
              <View style={styles.termsTextContainer}>
                <Text style={styles.termsText}>Acepto los </Text>
                <TouchableOpacity onPress={handleTermsPress}>
                  <Text style={styles.termsLink}>Términos y Condiciones</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Botón Registrarse */}
            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.registerButton}
              labelStyle={styles.registerButtonText}
            >
              Registrarse
            </Button>
          </View>

          {/* Enlaces del Footer */}
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={handleSupportPress}>
              <Text style={styles.footerLink}>Soporte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTermsPress}>
              <Text style={styles.footerLink}>Términos de Uso</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePrivacyPress}>
              <Text style={styles.footerLink}>Política de Privacidad</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TermsModal
          visible={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          onAccept={() => {
            setAcceptTerms(true);
            setShowTermsModal(false);
          }}
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

export default RegisterScreen;