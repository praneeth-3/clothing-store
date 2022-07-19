import { createContext, useState, useEffect } from "react";
import { getCollectionAndDocuments } from "../utils/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setcategoriesMap] = useState({});
    
    useEffect(()=>{
        const getCatagotiesMap = async ()=>{
            const categoriesMap = await getCollectionAndDocuments();
            setcategoriesMap(categoriesMap);
        }
        getCatagotiesMap();
    }, []);
    return (
        <CategoriesContext.Provider value={{ categoriesMap }}>
            {children}
        </CategoriesContext.Provider>
    );
}