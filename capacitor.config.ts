import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'weather-app',
  webDir: 'src',
  server: {
    androidScheme: 'https',
  },
};

export default config;
