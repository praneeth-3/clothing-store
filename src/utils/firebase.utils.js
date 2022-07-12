import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA9Gn_L1gvaaR3V89z-Aw1M8LW2x3h6tVU",
    authDomain: "clothing-store-db-f037f.firebaseapp.com",
    projectId: "clothing-store-db-f037f",
    storageBucket: "clothing-store-db-f037f.appspot.com",
    messagingSenderId: "623687005107",
    appId: "1:623687005107:web:fc3703111b084cb04951c6"
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db =  getFirestore();
export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }
        catch(error){
            console.log('Error creating the user: ', error.message);
        }
    }
    else{

    }
}