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
import { Checkbox, Button } from 'react-native-paper';
import { BSIcon, SenaIcons } from '../components/ui/BSIcon';
import Input from '../components/ui/Input';
import SenaLogo from '../components/SenaLogo';
import { isSenaEmail } from '../utils/validationlogin';
import TermsModal from '../components/TermsModal';
import { registerScreenStyles as styles } from '../styles/RegisterScreen.styles';

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
  
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDocumentPicker, setShowDocumentPicker] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title?: string; content?: React.ReactNode }>({});

  const documentTypes = [
    { label: 'Cédula de Ciudadanía', value: 'CC' },
    { label: 'Tarjeta de Identidad', value: 'TI' },
    { label: 'Cédula de Extranjería', value: 'CE' },
    { label: 'Pasaporte', value: 'PA' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validaciones en tiempo real
    let error = '';
    switch (field) {
      case 'email':
        error = !isSenaEmail(value) && value.length > 0 ? 
          'El correo debe ser institucional (@soy.sena.edu.co o @sena.edu.co)' : '';
        break;
      case 'firstName':
        error = value.length > 0 && value.length < 2 ? 
          'El nombre debe tener al menos 2 caracteres' : '';
        break;
      case 'lastName':
        error = value.length > 0 && value.length < 2 ? 
          'Los apellidos deben tener al menos 2 caracteres' : '';
        break;
      case 'documentNumber':
        error = value.length > 0 && (value.length < 6 || !/^\d+$/.test(value)) ? 
          'El número de documento debe tener al menos 6 dígitos' : '';
        break;
      case 'phone':
        error = value.length > 0 && (value.length < 10 || !/^\d+$/.test(value)) ? 
          'El teléfono debe tener al menos 10 dígitos' : '';
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      email: '',
      firstName: '',
      lastName: '',
      documentType: '',
      documentNumber: '',
      phone: '',
    };

    // Validar campos requeridos
    if (!formData.email) newErrors.email = 'El correo es requerido';
    else if (!isSenaEmail(formData.email)) newErrors.email = 'Correo institucional inválido';

    if (!formData.firstName) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName) newErrors.lastName = 'Los apellidos son requeridos';
    if (!formData.documentType) newErrors.documentType = 'Selecciona el tipo de documento';
    if (!formData.documentNumber) newErrors.documentNumber = 'El número de documento es requerido';
    if (!formData.phone) newErrors.phone = 'El teléfono es requerido';

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
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
      // TODO: Implementar llamada a la API de registro
      console.log('Registrando usuario:', formData);
      
      // Simulación de registro exitoso
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          'Registro Exitoso', 
          'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.',
          [
            {
              text: 'Ir al Login',
              onPress: () => navigation?.navigate('Login'),
            },
          ]
        );
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Error al crear la cuenta. Inténtalo de nuevo.');
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

  const handlePrivacyPress = () => {
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
                  formData.documentType ? styles.pickerTextSelected : styles.pickerTextPlaceholder
                ]}>
                  {formData.documentType 
                    ? documentTypes.find(type => type.value === formData.documentType)?.label 
                    : 'Tipo de documento'
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
                  {documentTypes.map((type) => (
                    <TouchableOpacity
                      key={type.value}
                      style={styles.pickerOption}
                      onPress={() => {
                        handleInputChange('documentType', type.value);
                        setShowDocumentPicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>{type.label}</Text>
                    </TouchableOpacity>
                  ))}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ...existing code...

export default RegisterScreen;