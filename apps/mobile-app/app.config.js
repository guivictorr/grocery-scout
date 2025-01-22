const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getConfig = () => {
  if (IS_DEV) {
    return {
      uniqueIdentifier: "com.gui.groceryscout.dev",
      appName: "(Dev) Grocery Scout",
      icon: "./assets/images/icon.png",
    };
  }

  if (IS_PREVIEW) {
    return {
      uniqueIdentifier: "com.gui.groceryscout.preview",
      appName: "(Preview) Grocery Scout",
      icon: "./assets/images/icon.png",
    };
  }

  return {
    uniqueIdentifier: "com.gui.groceryscout",
    appName: "Grocery Scout",
    icon: "./assets/images/icon.png",
  };
};

export const config = getConfig();

export default {
  expo: {
    name: config.appName,
    slug: "grocery-scout",
    version: "1.0.0",
    orientation: "portrait",
    icon: config.icon,
    scheme: "myapp",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    updates: {
      url: "https://u.expo.dev/0faef0f2-8daa-4209-a4ee-9933e7866784",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: config.uniqueIdentifier,
    },
    android: {
      package: config.uniqueIdentifier,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
      ],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true,
        },
      ],
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "0faef0f2-8daa-4209-a4ee-9933e7866784",
      },
    },
    owner: "guilhermevictor",
  },
};
