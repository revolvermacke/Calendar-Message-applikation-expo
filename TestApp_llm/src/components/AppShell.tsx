import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getAppExtraConfig } from '../lib/config';
import { StyledLinearGradient } from '../lib/nativewind';
import type { TabKey } from '../types/app';
import { AppHeader } from './AppHeader';
import { BottomTabBar } from './BottomTabBar';
import { CalendarScreen } from './CalendarScreen';
import { NoticesScreen } from './NoticesScreen';

export function AppShell() {
  const { apiUrl, appEnv } = getAppExtraConfig();
  const [activeTab, setActiveTab] = useState<TabKey>('notices');

  return (
    <StyledLinearGradient
      className="flex-1"
      colors={['#8f1029', '#c62828', '#f06b4f', '#4f7cff', '#123c91']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-5 pt-4">
          <AppHeader apiUrl={apiUrl} appEnv={appEnv} />

          <View className="mt-5 flex-1 overflow-hidden rounded-shell bg-surface-panel">
            <ScrollView
              contentContainerStyle={{ padding: 20, paddingBottom: 28 }}
              showsVerticalScrollIndicator={false}
            >
              {activeTab === 'notices' ? (
                <NoticesScreen />
              ) : (
                <CalendarScreen isActive={activeTab === 'calendar'} />
              )}
            </ScrollView>
          </View>
        </View>

        <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </SafeAreaView>
      <StatusBar style="light" />
    </StyledLinearGradient>
  );
}
