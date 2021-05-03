import {
   ProductModelType
} from '../../models/ProductModel';

export interface ProductStateType {
  productDataList: ProductModelType;
  productUid: number;
}
export const ADD_PRODUCT_UID = 'ADD_PRODUCT_UID';

interface AddProductIdAction {
  type: typeof ADD_PRODUCT_UID;
  payload: number;
}

export type ProductActionTypes =
  | AddProductIdAction;
