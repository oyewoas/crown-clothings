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

export const CreateUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists){
        const{ displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
};

  
firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()
    objectToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
    })

   return await batch.commit()
}

export const convertCollectionsSnapshopToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
   
    
   return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {})
}
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    'prompt': 'select_account'
  });

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase