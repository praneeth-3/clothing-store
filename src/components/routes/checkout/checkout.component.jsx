import { CartContext } from '../../../contexts/cart.context';
import CheckoutItem from '../../checkout-item/checkout-item.component';
import './checkout.styles.scss';
import { useContext } from 'react';

const Checkout = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">Product</div>
                <div className="header-block">Description</div>
                <div className="header-block">Quantity</div>
                <div className="header-block">Price</div>
                <div className="header-block">Remove</div>
            </div>
            {cartItems.map((cartItem) => <CheckoutItem cartItem={cartItem} />)}
        </div>
    );
}

export default Checkout;