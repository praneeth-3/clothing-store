import { useContext, createContext, useState, useEffect } from "react";
import { UserContext } from "./user.context";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    cartTotal: 0
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
const removeCartItem = (cartItems, productToRemove)=>{
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToRemove.id);
    var resCartItems = cartItems
    if(existingCartItem){
        const existingCartItem = cartItems.find((cartItem)=> cartItem.id===productToRemove.id);
        if(existingCartItem){   
            if(existingCartItem.quantity===1){
                return clearCartItem(cartItems, productToRemove);
            }
            else{
                return cartItems.map((cartItem)=>{
                    if(cartItem.id===productToRemove.id){
                        return {...cartItem, quantity: cartItem.quantity-1};
                    }
                    else{
                        return cartItem;
                    }
                });
            }
        }
    }
    return resCartItems;
}
const clearCartItem = (cartItems, productToRemove)=>{
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
    const [cartTotal, setCartTotal] = useState(0);
    const {currentUser} = useContext(UserContext);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=> total+cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);
    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartItem)=> total+(cartItem.quantity*cartItem.price), 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);
    const addItemToCart = (productToAdd)=>{
        if(currentUser)
            setCartItems(addCartItem(cartItems, productToAdd));
        else
            alert("Please login to add items to cart");
    }
    const removeItemFromCart = (productToRemove)=>{
        setCartItems(removeCartItem(cartItems, productToRemove));
    }
    const clearItemFromCart = (productToRemove)=>{
        setCartItems(clearCartItem(cartItems, productToRemove));
    }
    const clearAllCartItems = ()=>{
        setCartItems([]);
    }
    return (
        <CartContext.Provider value={{ isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, clearAllCartItems, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}