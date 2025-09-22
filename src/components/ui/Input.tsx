import React from 'react';
import { 
  TextInput, 
  Text, 
  View, 
  StyleSheet, 
  TextInputProps,
  ViewStyle,
  TextStyle 
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      
      <View style={StyleSheet.flatten([
        styles.inputContainer,
        error ? styles.inputError : null,
      ])}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={StyleSheet.flatten([
            styles.input,
            inputStyle,
          ])}
          placeholderTextColor="#9E9E9E"
          {...textInputProps}
        />
        
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      )}
      
      {hint && !error && (
        <Text style={styles.hintText}>{hint}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D5016',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    height: 48,
    paddingLeft: 12,
    paddingRight: 12,
    width: '100%',
  },
  inputError: {
    borderColor: '#DC3545',
  },
  input: {
    flex: 1,
    height: '100%',
    alignSelf: 'stretch',
    color: '#212121',
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    textAlignVertical: 'center',
  },
  leftIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#DC3545',
    marginTop: 4,
  },
  hintText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
});

export default Input;