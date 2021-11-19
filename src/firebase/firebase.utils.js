import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config ={
    apiKey: "AIzaSyARXoux_SWFneKmviygN46gySyO8nF8Ibk",
    authDomain: "clothing-db-7d6be.firebaseapp.com",
    databaseURL: "https://clothing-db-7d6be.firebaseio.com",
    projectId: "clothing-db-7d6be",
    storageBucket: "",
    messagingSenderId: "1025879588361",
    appId: "1:1025879588361:web:e920b2460d1d4a0e6dc2d8"
}

export const createUserProfileDocument = async (userAuth,additionalData)=> {
    if(!userAuth){
        return
    }
    // console.log(userAuth);
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName,email} = userAuth
        const createdAt = new Date()

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log(error.message)
        }
    }
    return userRef
}

firebase.initializeApp(config)
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle = ()=> auth.signInWithPopup(provider)

export default firebase
