import {useEffect, useContext} from 'react';
import Directory from '../../components/directory/directory.component';
import { CartContext } from '../../contexts/cart.context';

const Home = () => {
  const { setIsCartOpen, isCartOpen } = useContext(CartContext);
  useEffect(()=>{
      if(isCartOpen) setIsCartOpen(false);
  },[]);

  return (
    <Directory />
  );
}

export default Home;