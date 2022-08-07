import {Routes, Route} from 'react-router-dom';
import {useEffect, useContext} from 'react';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../catagory/category.component';
import { CartContext } from '../../contexts/cart.context';

const Shop = () => {
    const { setIsCartOpen, isCartOpen } = useContext(CartContext);
    useEffect(()=>{
        if(isCartOpen) setIsCartOpen(false);
    },[]);
  
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}

export default Shop;