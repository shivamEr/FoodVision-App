import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mobile-app-74be3.firebaseapp.com",
  projectId: "mobile-app-74be3",
  storageBucket: "mobile-app-74be3.firebasestorage.app",
  messagingSenderId: "485699232858",
  appId: "1:485699232858:web:930fc3206809d0234fe463",
  measurementId: "G-KPGM8KBFQG",
};

// Init
const app = initializeApp(firebaseConfig);

export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
