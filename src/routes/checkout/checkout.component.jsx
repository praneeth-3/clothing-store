import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {HeaderBlock, CheckoutHeader, Total, CheckoutContainer} from './checkout.styles';
import { useContext, useEffect } from 'react';

const Checkout = () => {
    const { cartItems, cartTotal, setIsCartOpen, isCartOpen } = useContext(CartContext);
    useEffect(()=>{
        if(isCartOpen) setIsCartOpen(false);
    },[]);
    return (
        <CheckoutContainer data-test-id="checkout-container">
            <CheckoutHeader>
                <HeaderBlock>Product</HeaderBlock>
                <HeaderBlock>Description</HeaderBlock>
                <HeaderBlock>Quantity</HeaderBlock>
                <HeaderBlock>Price</HeaderBlock>
                <HeaderBlock>Remove</HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => <CheckoutItem key={cartItem.name} cartItem={cartItem} />)}
            <Total>
                Total: ${cartTotal}
            </Total>
        </CheckoutContainer>
    );
}

export default Checkout;