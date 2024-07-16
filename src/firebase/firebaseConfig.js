// lib/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDVTKakDFCGlk1246KPIGYABMBR4SusAZk',
  authDomain: 'stock-tracker-ffadc.firebaseapp.com',
  projectId: 'stock-tracker-ffadc',
  storageBucket: 'stock-tracker-ffadc.appspot.com',
  messagingSenderId: '798796206239',
  appId: '1:798796206239:web:39af62c01817ccda6712aa',
  measurementId: 'G-LJF0FK0X9E',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { auth, analytics };
