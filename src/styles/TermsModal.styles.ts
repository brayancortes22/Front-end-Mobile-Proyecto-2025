import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const termsModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 24,
    width: Math.min(width - 32, 420),
    maxHeight: '80%',
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 16,
    color: '#424242',
    lineHeight: 22,
    textAlign: 'justify',
  },
});
