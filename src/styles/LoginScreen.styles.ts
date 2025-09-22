import { StyleSheet } from 'react-native';

export const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 19,
    paddingVertical: 43,
    alignItems: 'center',
    gap: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#43A047',
    textAlign: 'center',
    letterSpacing: -0.6,
    lineHeight: 32,
    marginBottom: 16,
  },
  loginSection: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 12,
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#424242',
    lineHeight: 36,
  },
  loginSubtitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#757575',
    lineHeight: 20,
  },
  formContainer: {
    width: '100%',
    gap: 20,
    alignItems: 'center',
    
  },
  input: {},
  forgotPasswordContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#43A047',
    fontWeight: '400',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#388E3C',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginTop: 11,
  },
  loginButtonText: {
    fontSize: 25,
    paddingVertical: 5,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  registerPrompt: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '400',
  },
  registerLink: {
    fontSize: 16,
    color: '#43A047',
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  footerLink: {
    fontSize: 12,
    color: '#9E9E9E',
    fontWeight: '400',
    lineHeight: 16,
  },
});
