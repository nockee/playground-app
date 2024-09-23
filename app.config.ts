import { ConfigContext, ExpoConfig } from 'expo/config';

import packageJson from './package.json';

const IS_DEV = process.env.APP_VARIANT === 'development';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: `playground${IS_DEV ? ' (dev)' : ''}`,
  owner: 'nockee',
  slug: 'playground-app',
  version: packageJson.version,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    bundleIdentifier: `com.nockee.playground${IS_DEV ? '.staging' : ''}`,
    googleServicesFile: IS_DEV
      ? './config/GoogleService-Info.staging.plist'
      : './config/GoogleService-Info.production.plist',
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    googleServicesFile: IS_DEV ? './config/google-services.staging.json' : './config/google-services.production.json',
    package: `com.nockee.playground${IS_DEV ? '.staging' : ''}`,
  },
  plugins: [
    'expo-router',
    [
      '@sentry/react-native/expo',
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        // If you are using a self-hosted instance, update the value of the url property
        // to point towards your self-hosted instance. For example, https://self-hosted.example.com/.
        url: 'https://sentry.io/',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: 'dd959df1-9601-45d6-a591-92b05714d77d',
    },
  },
});
