import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/security/MobileNavTabs.styles';

interface Tab {
  icon: React.ReactNode;
  label: string;
}

interface MobileNavTabsProps {
  tabs: Tab[];
  selectedTab?: number;
  onTabPress?: (index: number) => void;
}

const MobileNavTabs: React.FC<MobileNavTabsProps> = ({ tabs, selectedTab = 0, onTabPress }) => (
  <View style={styles.container}>
    {tabs.map((tab, i) => (
      <Text
        key={i}
        style={[
          styles.tab,
          selectedTab === i ? null : styles.tabInactive,
        ]}
        onPress={() => onTabPress && onTabPress(i)}
      >
        {tab.icon}
        <Text style={selectedTab === i ? styles.labelActive : styles.label}>{tab.label}</Text>
      </Text>
    ))}
  </View>
);

export default MobileNavTabs;
