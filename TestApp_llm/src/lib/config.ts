import Constants from 'expo-constants';

import type { AppExtraConfig } from '../types/app';

export const getAppExtraConfig = (): Required<AppExtraConfig> => {
  const extra = Constants.expoConfig?.extra as AppExtraConfig | undefined;

  return {
    appEnv: extra?.appEnv ?? 'development',
    apiUrl: extra?.apiUrl ?? '',
  };
};
