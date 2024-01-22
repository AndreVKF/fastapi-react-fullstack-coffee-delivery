import { CartProduct } from '../../contexts/CartContext'

export enum CartActionEnum {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  UPDATE_ITEM = 'UPDATE_ITEM',
  CLEAR_CART = 'CLEAR_CART',
}

export function addNewProductToCartAction(cartProduct: CartProduct) {
  return {
    type: CartActionEnum.ADD_TO_CART,
    payload: {
      cartProduct,
    },
  }
}

export function removeProductFromCartAction(idProduct: number) {
  return {
    type: CartActionEnum.REMOVE_FROM_CART,
    payload: {
      idProduct,
    },
  }
}

export function updateProductFromCartAction(
  idProduct: number,
  quantity: number,
) {
  return {
    type: CartActionEnum.UPDATE_ITEM,
    payload: {
      idProduct,
      quantity,
    },
  }
}

export function clearCartAction() {
  return {
    type: CartActionEnum.CLEAR_CART,
    payload: {},
  }
}
