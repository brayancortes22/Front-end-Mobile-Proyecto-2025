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
    maxHeight: 360,
  },
  headerIcon: {
    alignItems: 'center',
    marginBottom: 8,
  },
  pillIcon: {
    width: 58,
    height: 56,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  titleLarge: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 12,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cecacaff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#424242',
  },
  list: {
    marginTop: 6,
  },
  listItem: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
    marginBottom: 4,
  },
  legalText: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 22,
    textAlign: 'justify',
  },
  footer: {
    marginTop: 16,
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
