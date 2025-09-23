import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BSIcon from './ui/BSIcon';

type Variant = 'default' | 'green' | 'yellow' | 'red';

interface Props {
  title: string;
  subtitle?: string;
  badgeLabel?: string;
  badgeColor?: string; // hex or color name
  count?: number | string;
  primaryText?: string;
  onPrimary?: () => void;
  secondaryText?: string;
  onSecondary?: () => void;
  iconName?: string;
  variant?: Variant;
}

const MobileInfoCard: React.FC<Props> = ({ title, subtitle, badgeLabel, badgeColor = '#def7df', count, primaryText, onPrimary, secondaryText, onSecondary, iconName, variant = 'default' }) => {
  const bgByVariant: Record<Variant, string> = {
    default: '#fff',
    green: '#e8f9ee',
    yellow: '#fff7e6',
    red: '#fdecea',
  };

  return (
    <View style={[styles.card, { backgroundColor: bgByVariant[variant] }]}>
      <View style={styles.topRow}>
        {iconName ? <BSIcon name={iconName} size={24} color="#1a48bc" /> : null}
        <View style={{ marginLeft: iconName ? 12 : 0, flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {typeof count !== 'undefined' ? (
          <View style={styles.countWrap}><Text style={styles.count}>{String(count)}</Text></View>
        ) : null}
      </View>

      {badgeLabel ? (
        <View style={[styles.badge, { backgroundColor: badgeColor }]}> <Text style={styles.badgeText}>{badgeLabel}</Text></View>
      ) : null}

      <View style={styles.actionsRow}>
        {primaryText ? (
          <TouchableOpacity style={styles.primaryButton} onPress={onPrimary}>
            <Text style={styles.primaryText}>{primaryText}</Text>
          </TouchableOpacity>
        ) : null}

        {secondaryText ? (
          <TouchableOpacity style={styles.secondaryButton} onPress={onSecondary}>
            <Text style={styles.secondaryText}>{secondaryText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { width: '100%', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#e6e7ee', marginBottom: 12 },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: '#020817' },
  subtitle: { fontSize: 12, color: '#607d8b', marginTop: 4 },
  countWrap: { backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  count: { fontSize: 18, fontWeight: '700', color: '#1a48bc' },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, marginTop: 10 },
  badgeText: { color: '#064e2a', fontWeight: '700' },
  actionsRow: { marginTop: 12, flexDirection: 'column' },
  primaryButton: { backgroundColor: '#1a8f3b', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryButton: { marginTop: 8, backgroundColor: '#fff', paddingVertical: 10, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#e6e7ee' },
  secondaryText: { color: '#333', fontWeight: '600' },
});

export default MobileInfoCard;
