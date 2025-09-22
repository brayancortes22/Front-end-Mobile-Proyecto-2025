import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const privacyPolicyModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 12,
    padding: 24,
    maxHeight: '80%',
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  closeButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43A047',
    flex: 1,
  },
  scrollContent: {
    maxHeight: 320,
  },
  legalText: {
    fontSize: 15,
    color: '#424242',
    lineHeight: 22,
    textAlign: 'justify',
  },
  section: {
    margin: 12,
    maxWidth: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
