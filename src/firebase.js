import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCtv0dGLI0tHxTmj_f0s2UIdg1P6e4zvqo",
    authDomain: "slack-clone-82fb7.firebaseapp.com",
    projectId: "slack-clone-82fb7",
    storageBucket: "slack-clone-82fb7.appspot.com",
    messagingSenderId: "918704102173",
    appId: "1:918704102173:web:105a70157ac8ed939a1ff4"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig);
  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;

  