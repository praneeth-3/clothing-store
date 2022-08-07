import { useContext, Fragment, useEffect } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CartContext } from '../../contexts/cart.context';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    const {setIsCartOpen, isCartOpen} = useContext(CartContext);
    useEffect(()=>{
        if(isCartOpen)
            setIsCartOpen(false);
    },[]);
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title)=>{
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
        </Fragment>
    );
}

export default CategoriesPreview;