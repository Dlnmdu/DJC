// Mock react-native-reanimated
global.__reanimatedWorkletInit = jest.fn();
jest.mock("react-native-reanimated", () => {
  const MockedAnimated = {
    View: "View",
    useSharedValue: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn(() => ({})),
    withRepeat: jest.fn(),
    withSequence: jest.fn(),
    withTiming: jest.fn(),
  };
  return MockedAnimated;
});

// Mock react-native modules
jest.mock("react-native", () => ({
  Platform: {
    OS: "ios",
    select: jest.fn((obj) => obj.ios),
  },
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
  Text: "Text",
  View: "View",
  TouchableOpacity: "TouchableOpacity",
  Button: "Button",
  Alert: {
    alert: jest.fn(),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
  },
}));

// Mock expo modules
jest.mock("expo-constants", () => ({
  executionEnvironment: "standalone",
}));

jest.mock("expo-linking", () => ({
  openURL: jest.fn(),
  getInitialURL: jest.fn(() => Promise.resolve(null)),
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: jest.fn(),
    push: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock Google Sign In
jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn(),
    signInSilently: jest.fn(),
    signOut: jest.fn(),
    revokeAccess: jest.fn(),
    hasPreviousSignIn: jest.fn(() => false),
    getCurrentUser: jest.fn(() => null),
    getTokens: jest.fn(() => Promise.resolve(null)),
  },
  GoogleSigninButton: "GoogleSigninButton",
  isSuccessResponse: jest.fn(),
}));
