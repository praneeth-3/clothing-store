import './checkout-item.styles.scss';
import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    const {addItemToCart, deleteSingleItemFromCart, deleteItemFromCart} = useContext(CartContext);
    const addItem = ()=>{
        addItemToCart({id: cartItem.id});
    };
    const deleteSingleItem = ()=>{
        deleteSingleItemFromCart({id: cartItem.id});
    }
    const deleteItem = ()=>{
        deleteItemFromCart({id: cartItem.id});
    }
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className="arrow" onClick={deleteSingleItem}>{'<'}</div>
                <div className="value">{quantity}</div>
                <div className="arrow" onClick={addItem}>{'>'}</div>
            </span>
            <span className='price'>{quantity * price}</span>
            <span className='remove-button' onClick={deleteItem}>Remove</span>
        </div>
    );
};

export default CheckoutItem;