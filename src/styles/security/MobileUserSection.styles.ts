import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
  registerBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginBottom: 16,
  },
  registerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filtersRow: {
    marginBottom: 16,
  },
  filterInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#7d7e81',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 15,
    color: '#000',
  },
  filterBtnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  filterBtn: {
    backgroundColor: 'rgba(204, 204, 204, 0.47)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 8,
  },
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  green: {
    backgroundColor: '#e6fbe6',
    borderColor: '#22c55e',
  },
  yellow: {
    backgroundColor: '#fffbe6',
    borderColor: '#eab308',
  },
  red: {
    backgroundColor: '#ffe6e6',
    borderColor: '#ef4444',
  },
  habilitadosTitle: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  registradosTitle: {
    color: '#eab308',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  inhabilitadosTitle: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});
