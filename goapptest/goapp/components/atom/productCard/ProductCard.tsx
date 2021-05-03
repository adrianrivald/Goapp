import React, { CSSProperties } from 'react';
import { priceToRupiah } from '../../../helpers/priceToRupiah';
import { ProductDetailModelType, ProductModelType } from '../../../models/ProductModel';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  productData: ProductDetailModelType[];
}

const ProductCard = (Props: ProductCardProps) => {
  const {
   productData
  } = Props;
  
 
  return (
    <div className={`${styles['product-card']}`} >
        {
            productData.map((result, i) => {
                return (
                    <div className={`${styles['product-card-list']}`} >              
                        <div className={`${styles['product-image']}`} key={result.uid}>
                            <img src={result.primary_image_url} />
                        </div>
                        <div className={`${styles['product-main']}`}>
                            <h1>{result.name}</h1>
                            <div className={`${styles['product-price']}`}>{priceToRupiah(result.original_price.price)}</div> 
                            <div className={`${styles['product-sold']}`}>Terjual | {result.total_sold}</div>  
                        </div>
                    </div>
                )
            })
        }
    </div>
  );
};

export default ProductCard;
