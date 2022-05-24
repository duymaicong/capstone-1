

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBId7dbUHABTN0_M81s4EFrFZkdDt80zAI",
  authDomain: "uploadimagereact-9ec8f.firebaseapp.com",
  projectId: "uploadimagereact-9ec8f",
  storageBucket: "uploadimagereact-9ec8f.appspot.com",
  messagingSenderId: "304823003903",
  appId: "1:304823003903:web:3bddc6256e95de9b7b7aca",
  measurementId: "G-7BCH0M88JJ"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;
