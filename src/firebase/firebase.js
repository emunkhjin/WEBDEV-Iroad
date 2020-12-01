import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA8yEtEb43d9vKJ68QevCceu025047Xd6Q",
  authDomain: "iroad-d0ce7.firebaseapp.com",
  databaseURL: "https://iroad-d0ce7.firebaseio.com",
  projectId: "iroad-d0ce7",
  storageBucket: "iroad-d0ce7.appspot.com",
  messagingSenderId: "1094036965431",
  appId: "1:1094036965431:web:1bc7ad3bce265a8f7fd7b2",
  measurementId: "G-PGCRTVVK81"
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};
