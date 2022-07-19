import {CartDropDownContainer, CartItems} from './cart-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom'
import Button from '../button/button.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = ()=>{
        navigate('/checkout');
    }
    return (
        <CartDropDownContainer>
            <CartItems>
                {cartItems.map((item) => (
                    <CartItem key={item.name} cartItem={item} />
                ))}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropDownContainer>
    );
}

export default CartDropdown;