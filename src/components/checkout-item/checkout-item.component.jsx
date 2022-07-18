import './checkout-item.styles.scss';
import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
    const addItemHandler = ()=>{
        addItemToCart({id: cartItem.id});
    };
    const removeItemHandler = ()=>{
        removeItemFromCart({id: cartItem.id});
    }
    const clearItemHandler = ()=>{
        clearItemFromCart({id: cartItem.id});
    }
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <div className="value">{quantity}</div>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{quantity * price}</span>
            <span className='remove-button' onClick={clearItemHandler}>&#10005;</span>
        </div>
    );
};

export default CheckoutItem;