import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-lMqR_ndZDM44DL3YdUGQCOvPFCduaHg",
  authDomain: "myfitness-9e699.firebaseapp.com",
  projectId: "myfitness-9e699",
  storageBucket: "myfitness-9e699.firebasestorage.app",
  messagingSenderId: "427722157507",
  appId: "1:427722157507:web:3aa4fb05c0dc5830b46176",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
