import { ReactNode, createContext, useContext, useReducer } from 'react'
import { cartReducer } from '../reducers/cart'
import {
  addNewProductToCartAction,
  clearCartAction,
  removeProductFromCartAction,
  updateProductFromCartAction,
} from '../reducers/cart/actions'
import { ProductProps } from '../@types/product'

interface CartContextProviderProps {
  children: ReactNode
}

export interface CartProduct extends ProductProps {
  quantity: number
}

interface CartContext {
  cartItems: CartProduct[]
  totalPayment: number
  totalCount: number
  addItemToCart: (cartProduct: CartProduct) => void
  removeItemFromCart: (idProduct: number) => void
  updateItemFromCart: (idProduct: number, quantity: number) => void
  clearCart: () => void
}

export interface CartState {
  cartItems: CartProduct[]
  totalPayment: number
  totalCount: number
}

const CartContext = createContext({} as CartContext)

export const initCartState = {
  cartItems: [],
  totalPayment: 0,
  totalCount: 0,
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(cartReducer, initCartState)

  const { cartItems, totalPayment, totalCount } = cartState

  function addItemToCart(cartProduct: CartProduct) {
    dispatch(addNewProductToCartAction(cartProduct))
  }

  function removeItemFromCart(idProduct: number) {
    dispatch(removeProductFromCartAction(idProduct))
  }

  function updateItemFromCart(idProduct: number, quantity: number) {
    dispatch(updateProductFromCartAction(idProduct, quantity))
  }

  function clearCart() {
    dispatch(clearCartAction())
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPayment,
        totalCount,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        updateItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
