import { ProductModelType } from '../../models/ProductModel';
import { ProductActionTypes, ProductStateType } from './type';


export const productInitialState: ProductStateType = {
  productDataList: {} as ProductModelType,
  productUid: 0 as number,
  productQuantity: 0 as number,
  productPrice: 0 as number
};

export function productReducer(
  state = productInitialState,
  action: ProductActionTypes
) {
  switch (action.type) {
    case 'ADD_PRODUCT_UID':
      return {
        ...state,
        productBuyId: action.payload,
      };
    case 'ADD_PRODUCT_QUANTITY' :
      return {
        ...state,
        productQuantity : action.payload,
      }
    case 'ADD_PRODUCT_PRICE' :
      return {
        ...state,
        productPrice : action.payload,
      }
    default:
      return state;
  }
}
