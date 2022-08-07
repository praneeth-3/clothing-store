import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import {AuthenticationContainer} from './authentication.styles';
import {useContext, useEffect} from 'react';
import { CartContext } from "../../contexts/cart.context";

const Authentication = () => {
    const {setIsCartOpen, isCartOpen} = useContext(CartContext);
    useEffect(()=>{
        if(isCartOpen)
            setIsCartOpen(false);
    }, []);
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default Authentication;