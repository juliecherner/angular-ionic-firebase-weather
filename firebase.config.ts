// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDx4F2WPhSuNvkdsOrgTUQnamdIDUTf2C0',
  authDomain: 'ionic-weather-app-31eef.firebaseapp.com',
  projectId: 'ionic-weather-app-31eef',
  storageBucket: 'ionic-weather-app-31eef.appspot.com',
  messagingSenderId: '617712458659',
  appId: '1:617712458659:web:a3fdecf5f847d91e199816',
  measurementId: 'G-821RZ7W1N2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
