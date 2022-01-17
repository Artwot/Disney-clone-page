import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNp2b3c5Oa_3IgHljhvdM-EC8SplTKehI",
  authDomain: "disney-clone-99394.firebaseapp.com",
  projectId: "disney-clone-99394",
  storageBucket: "disney-clone-99394.appspot.com",
  messagingSenderId: "21516278681",
  appId: "1:21516278681:web:ea6ec56dd0aeba8011d108",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
