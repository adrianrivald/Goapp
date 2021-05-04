import {
  ADD_PRODUCT_UID,
  ADD_PRODUCT_QUANTITY,
  ADD_PRODUCT_PRICE
} from './type';

export function addProductId(data: number) {
  return {
    type: ADD_PRODUCT_UID,
    payload: data,
  };
}

export function addProductQuantity(data: number) {
  return {
    type: ADD_PRODUCT_QUANTITY,
    payload: data,
  };
}

export function addProductPrice(data: number) {
  return {
    type: ADD_PRODUCT_PRICE,
    payload: data,
  };
}