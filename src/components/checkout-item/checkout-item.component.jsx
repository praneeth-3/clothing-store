import {CheckoutItemContainer, ImageContainer, StyledImg, StyledSpan, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles';
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
        <CheckoutItemContainer data-test-id="checkout-item">
            <ImageContainer>
                <StyledImg src={imageUrl} alt={name} />
            </ImageContainer>
            <StyledSpan>{name}</StyledSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <StyledSpan>{quantity * price}</StyledSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;