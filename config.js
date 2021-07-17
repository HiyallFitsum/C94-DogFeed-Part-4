import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBXrub6KTWJkr9_ZtQYG6X6dn3NvLHlkjI",
  authDomain: "hiyalldogfeedapp-aa33c.firebaseapp.com",
  projectId: "hiyalldogfeedapp-aa33c",
  storageBucket: "hiyalldogfeedapp-aa33c.appspot.com",
  messagingSenderId: "598122529770",
  appId: "1:598122529770:web:ae5574a89d41383111e893",
  measurementId: "G-9BR5VWRTBC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
