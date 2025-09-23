import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#020817',
    marginBottom: 12,
    textAlign: 'left',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 8,
    alignItems: 'center',
  },
  cell: {
    width: 80,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#020817',
  },
  cellWide: {
    width: 120,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#020817',
  },
});
