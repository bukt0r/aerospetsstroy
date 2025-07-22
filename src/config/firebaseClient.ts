"use client";

import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
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

// Initialize Firebase only on client side
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  // Initialize Analytics only if supported
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((error) => {
    console.log('Analytics not supported:', error);
  });
}

export { app, db, analytics }; 