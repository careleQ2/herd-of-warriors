import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.herdofwarriors.app',
  appName: 'Herd of Warriors',
  webDir: '.output/public',
  server: {
    androidScheme: 'https',
    // iOS configuration
    iosSchemePath: 'index.html',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;
