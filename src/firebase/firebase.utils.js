import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCQaeD6iFqn72mGoS8ap05x_5oljYY_HtI",
    authDomain: "crown-clothing-db-7d200.firebaseapp.com",
    databaseURL: "https://crown-clothing-db-7d200.firebaseio.com",
    projectId: "crown-clothing-db-7d200",
    storageBucket: "crown-clothing-db-7d200.appspot.com",
    messagingSenderId: "412003120073",
    appId: "1:412003120073:web:94ddf7e0f0356c073e6e18",
    measurementId: "G-53PKW8W55X"
  
};


  
firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    'prompt': 'select_account'
  });

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase