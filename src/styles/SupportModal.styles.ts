import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const supportModalStyles = StyleSheet.create({
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
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  imageSmall: {
    width: 90,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  imageLarge: {
    width: 180,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  contactText: {
    fontSize: 15,
    color: '#424242',
    marginTop: 18,
    textAlign: 'center',
    lineHeight: 22,
  },
});
