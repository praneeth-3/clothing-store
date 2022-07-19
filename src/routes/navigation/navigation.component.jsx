import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase.utils';
import CartIcon from '../../components/Cart-Icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {Navigationcontainer, LogoContainer, NavLinks, NavLink} from './navigation.styles';

const NavigationBar = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    const handleSignOut = async () => {
        await signOutUser();
    }
    return (
        <Fragment>
            <Navigationcontainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>
                    {
                        currentUser? (
                            <NavLink as='span' onClick={handleSignOut}>SIGN OUT</NavLink>
                            ):(
                                <NavLink to='/auth'>SIGN IN</NavLink>
                            )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </Navigationcontainer>
            <Outlet />
        </Fragment>
    );
}

export default NavigationBar;