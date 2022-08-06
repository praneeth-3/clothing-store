import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db =  getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
}
export const getCollectionAndDocuments = async ()=>{
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querrySnapshot = await getDocs(q);
    const catagoryMap = querrySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    
    return catagoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo={})=>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }
        catch(error){
            console.log('Error creating the user: ', error.message);
        }
    }
    else{

    }
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);
export const onAuthUserChangedListener = async (callback) => {
    // if(!callback) throw "Callback Required Error";
    return onAuthStateChanged(auth, callback);
}