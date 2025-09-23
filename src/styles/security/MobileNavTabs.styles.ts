import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    backgroundColor: '#e1e2ed',
    borderRadius: 12,
    padding: 4,
    gap: 6,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 2,
    gap: 4,
    minHeight: 32,
    minWidth: 60,
  },
  tabInactive: {
    backgroundColor: '#e1e2ed',
  },
  label: {
    marginLeft: 4,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontWeight: '600',
    lineHeight: 16,
    fontSize: 12,
    color: '#64748b',
  },
  labelActive: {
    color: '#020817',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
});
