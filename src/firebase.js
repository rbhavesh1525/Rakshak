import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC4XbcNayUU2bOUi8bV49ViMH1xn3TCbEc",
  authDomain: "rakshak-1e306.firebaseapp.com",
  databaseURL: "https://rakshak-1e306-default-rtdb.firebaseio.com",
  projectId: "rakshak-1e306",
  storageBucket: "rakshak-1e306.firebasestorage.app",
  messagingSenderId: "815443830073",
  appId: "1:815443830073:web:c804d91811944beda134e8",
  measurementId: "G-M5L2SLLNK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ Analytics ko sirf browser me hi initialize karo
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { database, analytics };
