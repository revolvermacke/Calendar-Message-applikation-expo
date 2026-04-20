import { Pressable, Text, View } from 'react-native';

import type { TabKey } from '../types/app';

type BottomTabBarProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <View className="px-5 pb-4 pt-3">
      <View className="flex-row rounded-shell border border-surface-border bg-surface-nav p-2">
        <TabButton
          isActive={activeTab === 'notices'}
          label="Notiser"
          onPress={() => onTabChange('notices')}
        />
        <TabButton
          isActive={activeTab === 'calendar'}
          label="Kalender"
          onPress={() => onTabChange('calendar')}
        />
      </View>
    </View>
  );
}

type TabButtonProps = {
  isActive: boolean;
  label: string;
  onPress: () => void;
};

function TabButton({ isActive, label, onPress }: TabButtonProps) {
  return (
    <Pressable
      className={`flex-1 rounded-tab px-4 py-4 ${
        isActive ? 'bg-white' : 'bg-transparent'
      }`}
      onPress={onPress}
    >
      <Text
        className={`text-center text-base font-semibold ${
          isActive ? 'text-text-inverse' : 'text-text-primary'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
