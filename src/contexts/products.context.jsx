import { createContext, useState } from "react";
import PRODUCTS from '../utils/shop-data.json';

export const ProductsContext = createContext({
    products: [],
});
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    );
}