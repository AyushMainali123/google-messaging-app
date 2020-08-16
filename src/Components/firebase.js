import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDY5nCkkFY5tXueB5DUWbx5yCTNxrzPwAE",
  authDomain: "messenger-clone-ayush.firebaseapp.com",
  databaseURL: "https://messenger-clone-ayush.firebaseio.com",
  projectId: "messenger-clone-ayush",
  storageBucket: "messenger-clone-ayush.appspot.com",
  messagingSenderId: "569346468533",
  appId: "1:569346468533:web:2e6637e26dc58d8c486cfc",
  measurementId: "G-6H4V0ZEPQL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
export { auth, provider }
export default db
