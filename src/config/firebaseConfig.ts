// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side and if supported
let analytics: any = null;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((error) => {
    console.log('Analytics not supported:', error);
  });
}
