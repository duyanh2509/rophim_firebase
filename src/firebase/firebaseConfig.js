import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAY0F0upLfdMneFtz02rbCY9ONFq2u1IOc',
  authDomain: 'rophim-firebase.firebaseapp.com',
  projectId: 'rophim-firebase',
  storageBucket: 'rophim-firebase.firebasestorage.app',
  messagingSenderId: '286081078964',
  appId: '1:286081078964:web:8ebcb82d47c827256f69e1',
  measurementId: 'G-L9K21D9T0T',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
