"use client";

import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzNeRSRcf0d4K6Mq28_HLrBA1D3ElYiGA",
  authDomain: "aerospecstroy.firebaseapp.com",
  projectId: "aerospecstroy",
  storageBucket: "aerospecstroy.firebasestorage.app",
  messagingSenderId: "157821556593",
  appId: "1:157821556593:web:fa961cced2de0b8987c8d0",
  measurementId: "G-FXPFVFWHX3"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

// Analytics will be initialized separately on client side
const analytics: null = null;

// Initialize analytics only on client side
if (typeof window !== 'undefined') {
  // Analytics will be initialized when needed
  // import('firebase/analytics').then(({ getAnalytics, isSupported }) => {
  //   isSupported().then((supported) => {
  //     if (supported) {
  //       analytics = getAnalytics(app);
  //     }
  //   }).catch((error) => {
  //     console.log('Analytics not supported:', error);
  //   });
  // });
}

export { app, db, analytics }; 