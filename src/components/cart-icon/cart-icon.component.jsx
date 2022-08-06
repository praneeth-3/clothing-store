import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';
import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles';

const CartIcon = ()=>{
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const handleCartClick = ()=> setIsCartOpen(!isCartOpen);
    
    return (
        <CartIconContainer onClick={handleCartClick}>
            <ShoppingIcon />
            <ItemCount data-test-id='cart-item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;