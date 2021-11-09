import { initializeApp } from "firebase/app";

// provider
import {GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrcVOUaHe0vArXGRHiN_fqXhs9fIOhrP4",
  authDomain: "lapak-belajar.firebaseapp.com",
  projectId: "lapak-belajar",
  storageBucket: "lapak-belajar.appspot.com",
  messagingSenderId: "776351886184",
  appId: "1:776351886184:web:8b79a65b5fa333a9a544dd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// provider
export const providerGoogle = new GoogleAuthProvider()
export const providerFacebook = new FacebookAuthProvider()
export const providerTwitter = new TwitterAuthProvider()