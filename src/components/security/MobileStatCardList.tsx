import React from 'react';
import { ScrollView } from 'react-native';
import styles from '../../styles/security/MobileStatCardList.styles';
import MobileStatCard from './MobileStatCard';

interface Stat {
  iconName: string;
  count: number;
  label: string;
}

interface MobileStatCardListProps {
  stats: Stat[];
}

const MobileStatCardList: React.FC<MobileStatCardListProps> = ({ stats }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
    {stats.map((stat, i) => (
      <MobileStatCard key={i} {...stat} />
    ))}
  </ScrollView>
);

export default MobileStatCardList;
