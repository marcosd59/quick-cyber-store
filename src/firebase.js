import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCStOLmW1v7Lu2j_mHkJYdm36VtdBmvSzo",
  authDomain: "quickcyberstore.firebaseapp.com",
  projectId: "quickcyberstore",
  storageBucket: "quickcyberstore.appspot.com",
  messagingSenderId: "563820202119",
  appId: "1:563820202119:web:5071ea6b69a1bf0564d022",
};

// Initializa Firebase with the configuration
export const FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(FirebaseApp);
export { auth };
