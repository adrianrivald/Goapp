import React, { CSSProperties } from 'react';
import { ProductDetailModelType, ProductModelType } from '../../../models/ProductModel';
import ProductCard from '../../atom/productCard/ProductCard';
import styles from './ProductList.module.scss';

interface ProductCardProps {
  productData: ProductDetailModelType[];
  value?: string;
}

const ProductList = (Props: ProductCardProps) => {
  const {
   productData,
   value
  } = Props;
  
 
  return (
    <div className={`${styles['product-list']}`} >    
        <div className={`${styles['product-section-title']}`} >
            <h1>{value}</h1>
        </div>
        <ProductCard productData={productData} />
    </div>
  );
};

export default ProductList;
