import {
   ProductModelType
} from '../../models/ProductModel';

export interface ProductStateType {
  productDataList: ProductModelType;
  productUid: number;
  productQuantity: number;
  productPrice: number
}
export const ADD_PRODUCT_UID = 'ADD_PRODUCT_UID';
export const ADD_PRODUCT_QUANTITY= 'ADD_PRODUCT_QUANTITY';
export const ADD_PRODUCT_PRICE= 'ADD_PRODUCT_PRICE';

interface AddProductIdAction {
  type: typeof ADD_PRODUCT_UID;
  payload: number;
}

interface AddProductQuantityAction {
  type: typeof ADD_PRODUCT_QUANTITY;
  payload: number;
}

interface AddProductPriceAction {
  type: typeof ADD_PRODUCT_PRICE;
  payload: number;
}

export type ProductActionTypes =
  | AddProductIdAction
  | AddProductQuantityAction
  | AddProductPriceAction;
