import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const genericModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.32)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: Math.min(width - 32, 520),
    maxHeight: '85%',
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  closeButton: {
    marginRight: 12,
    padding: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#43A047',
    flex: 1,
  },
  scrollContent: {
    maxHeight: Math.min(520, Math.round((Dimensions.get('window').height || 800) * 0.6)),
  },
  legalText: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 22,
    textAlign: 'justify',
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#43A047',
    borderRadius: 8,
  },
  acceptButtonContent: {
    height: 44,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelButtonText: {
    color: '#757575',
    fontSize: 16,
  },
});
