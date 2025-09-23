import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'left',
    fontFamily: 'Roboto-Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#949cb2',
    marginBottom: 12,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  roleInfo: {
    fontWeight: 'bold',
    color: '#525363',
    fontSize: 15,
  },
  description: {
    fontSize: 13,
    color: '#949cb2',
  },
  count: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
    minWidth: 60,
  },
  green: {
    backgroundColor: '#e0f5cd',
    color: '#16a34a',
  },
  red: {
    backgroundColor: '#f5cdcd',
    color: '#dc2626',
  },
  blue: {
    backgroundColor: '#cddef5',
    color: '#2563eb',
  },
  yellow: {
    backgroundColor: '#f5edcd',
    color: '#eab308',
  },
  pink: {
    backgroundColor: '#f0cdf5',
    color: '#d946ef',
  },
});
