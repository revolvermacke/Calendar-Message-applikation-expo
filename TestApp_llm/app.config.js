const path = require('path');
const dotenv = require('dotenv');

const appEnv = process.env.APP_ENV || 'development';
const envFile = path.resolve(__dirname, `.env.${appEnv}`);

dotenv.config({ path: envFile, override: true });

const isProduction = appEnv === 'production';

module.exports = {
  expo: {
    name: isProduction ? 'TestApp_llm' : 'TestApp_llm (Dev)',
    slug: 'TestApp_llm',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      infoPlist: {
        NSCalendarsUsageDescription:
          'Appen behover tillgang till din kalender for att visa dina lokala kalendrar och kommande aktiviteter.',
      },
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: ['READ_CALENDAR', 'WRITE_CALENDAR'],
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      bundler: 'metro',
      favicon: './assets/favicon.png',
    },
    extra: {
      appEnv,
      apiUrl: process.env.EXPO_PUBLIC_API_URL || '',
      appName: process.env.EXPO_PUBLIC_APP_NAME || '',
    },
  },
};
