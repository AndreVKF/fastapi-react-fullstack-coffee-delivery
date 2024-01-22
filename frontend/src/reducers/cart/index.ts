import { CartProduct, initCartState } from './../../contexts/CartContext'
import { CartState } from '../../contexts/CartContext'
import { CartActionEnum } from './actions'

interface CartAction {
  type: CartActionEnum
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}

function getUpdatedTotalCount(cartItems: CartProduct[]) {
  return cartItems.reduce((acc, current) => {
    return acc + current.quantity
  }, 0)
}

function getUpdatedTotalPayment(cartItems: CartProduct[]) {
  return cartItems.reduce((acc, current) => {
    return acc + current.quantity * current.price
  }, 0)
}

export function cartReducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case CartActionEnum.ADD_TO_CART: {
      const newItem = action.payload.cartProduct

      const prevCartItems = [...state.cartItems]
      const productInCartIndex = prevCartItems.findIndex(
        (item) => item.id === newItem.id,
      )

      let updatedCartItems
      if (productInCartIndex === -1) {
        updatedCartItems = [...state.cartItems, newItem]
      } else {
        updatedCartItems = [...state.cartItems]
        updatedCartItems[productInCartIndex].quantity += newItem.quantity
      }

      const totalCount = getUpdatedTotalCount(updatedCartItems)
      const totalPayment = getUpdatedTotalPayment(updatedCartItems)

      return {
        ...state,
        cartItems: updatedCartItems,
        totalPayment,
        totalCount,
      }
    }

    case CartActionEnum.REMOVE_FROM_CART: {
      const { idProduct } = action.payload
      const updatedCartItems = [...state.cartItems]
      const productIndexOnCart = updatedCartItems.findIndex(
        (item) => item.id === idProduct,
      )

      if (productIndexOnCart !== -1) {
        updatedCartItems.splice(productIndexOnCart, 1)
      }

      const totalCount = getUpdatedTotalCount(updatedCartItems)
      const totalPayment = getUpdatedTotalPayment(updatedCartItems)

      return {
        ...state,
        cartItems: updatedCartItems,
        totalPayment,
        totalCount,
      }
    }

    case CartActionEnum.UPDATE_ITEM: {
      const { idProduct, quantity } = action.payload
      const updatedCartItems = [...state.cartItems]
      const productIndexOnCart = updatedCartItems.findIndex(
        (item) => item.id === idProduct,
      )

      if (productIndexOnCart !== -1) {
        updatedCartItems[productIndexOnCart].quantity = quantity
      }

      const totalCount = getUpdatedTotalCount(updatedCartItems)
      const totalPayment = getUpdatedTotalPayment(updatedCartItems)

      return {
        ...state,
        cartItems: updatedCartItems,
        totalPayment,
        totalCount,
      }
    }

    case CartActionEnum.CLEAR_CART: {
      return initCartState
    }

    default: {
      return state
    }
  }
}
