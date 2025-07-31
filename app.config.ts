/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: "Fase",
    slug: "fase",
    scheme: "fase",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    jsEngine: "hermes",
    newArchEnabled: false,
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.fase.app",
      buildNumber: "1",
      userInterfaceStyle: "automatic",
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "Cette application a besoin d'accéder à votre localisation pour afficher les événements près de vous.",
        NSLocationAlwaysUsageDescription:
          "Cette application utilise votre localisation pour des services de géolocalisation.",
        NSPhotoLibraryUsageDescription:
          "Cette application a besoin d'accéder à votre bibliothèque photo pour sélectionner des images d'événements.",
        NSCameraUsageDescription:
          "Cette application a besoin d'accéder à votre appareil photo pour prendre des photos d'événements.",
        NSPhotoLibraryAddUsageDescription:
          "Cette application a besoin d'accéder à votre bibliothèque photo pour enregistrer des images.",
        "com.apple.developer.usernotifications.sound": true,
      },
      entitlements: {
        "com.apple.developer.usernotifications.sound": true,
      },
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_IOS,
        usesNonExemptEncryption: false,
      },
    },
    android: {
      softwareKeyboardLayoutMode: "resize",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
      package: "com.fase.app",
      userInterfaceStyle: "automatic",
      config: {
        googleMaps: {
          apiKey:
            process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_ANDROID ||
            "AIzaSyCD-EPf5wxqdytmZ6uTSn-65bCHU2kPMw0",
        },
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-location",
      "expo-image-picker",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FFFFFF",
          image: "./assets/images/splash-icon.png",
          dark: {
            image: "./assets/images/splash-icon-dark.png",
            backgroundColor: "#000000",
          },
          imageWidth: 200,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  };
};
