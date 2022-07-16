import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthUserChangedListener } from "../utils/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});
export const UserProvider = ({ children }) => {
    const userStateChangeHandler = async ()=>{
        const unsubscribe = await onAuthUserChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        
        return unsubscribe;
    }
    useEffect(() => {
        userStateChangeHandler();
    }, [])

    const [currentUser, setCurrentUser] = useState(null);
    return <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </UserContext.Provider>
}