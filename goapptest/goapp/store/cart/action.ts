import {
  ADD_PRODUCT_UID,
} from './type';

export function addProductId(data: number) {
  return {
    type: ADD_PRODUCT_UID,
    payload: data,
  };
}