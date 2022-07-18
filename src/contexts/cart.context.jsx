import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0
});

const addCartItem = (cartItems, productToAdd)=>{
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id);
    if(existingCartItem){
        return cartItems.map((cartItem)=>{
            if(cartItem.id===productToAdd.id){
                return {...cartItem, quantity: cartItem.quantity+1};
            }
            else{
                return cartItem;
            }
        } )
    }
    return [...cartItems, {...productToAdd, quantity:1}];
}
const deleteSingleCartItem = (cartItems, productToRemove)=>{
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToRemove.id);
    let removeItem = false;
    var resCartItems = cartItems
    if(existingCartItem){
        resCartItems = cartItems.map((cartItem)=>{
            if(cartItem.id===productToRemove.id){
                if(cartItem.quantity > 1){
                    return {...cartItem, quantity: cartItem.quantity-1};
                }
                else{
                    removeItem = true;
                    return cartItem;
                }
            }
            else{
                return cartItem;
            }
        } )
        
        if(removeItem){
            resCartItems = deleteCartItem(cartItems, productToRemove)
        }
    }
    return resCartItems;
}
const deleteCartItem = (cartItems, productToRemove)=>{
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToRemove.id);
    if(existingCartItem){
        return cartItems.filter((cartItem)=> cartItem.id !== productToRemove.id);
    }
    return cartItems;
}
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=> total+cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);
    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const deleteSingleItemFromCart = (productToRemove)=>{
        setCartItems(deleteSingleCartItem(cartItems, productToRemove));
    }
    const deleteItemFromCart = (productToRemove)=>{
        setCartItems(deleteCartItem(cartItems, productToRemove));
    }
    return (
        <CartContext.Provider value={{ isCartOpen, setIsCartOpen, cartItems, addItemToCart, deleteSingleItemFromCart, deleteItemFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}