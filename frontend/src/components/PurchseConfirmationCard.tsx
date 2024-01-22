import styled from 'styled-components'
import { Trash } from '@phosphor-icons/react'

import { InputNumber } from './InputNumber'
import { ButtonWithIcon } from './ButtonWithIcon'

import { textM } from '../styles/themes/typography'
import { formatNumberToCurrency } from '../utils/formatNumberToCurrency'
import { CartProduct, useCartContext } from '../contexts/CartContext'
import { useEffect, useState } from 'react'

export const PurchaseConfirmationCard = (cartProduct: CartProduct) => {
  const { id, image_url, price, quantity, name, description } = cartProduct

  const [image, setImage] = useState('')
  const [cartQuantity, setCartQuantity] = useState(quantity)
  const { updateItemFromCart, removeItemFromCart } = useCartContext()

  const totalProductPayment = quantity * price
  const adjustedPrice = formatNumberToCurrency(totalProductPayment)

  function handleAddCount() {
    const newQuantity = cartQuantity + 1
    setCartQuantity(newQuantity)
  }

  function handleSubtractCount() {
    const newQuantity = cartQuantity - 1
    if (newQuantity <= 0) return

    setCartQuantity(newQuantity)
  }

  function handleRemoveItemFromCart() {
    removeItemFromCart(id)
  }

  useEffect(() => {
    if (quantity === cartQuantity) return

    updateItemFromCart(id, cartQuantity)
  }, [quantity, cartQuantity, updateItemFromCart, id])

  useEffect(() => {
    import(image_url).then((image) => setImage(image.default))
  }, [image_url])

  return (
    <PurchaseConfirmationCardContainer>
      <img src={image} alt={description} />
      <PurchaseInfoWrapper>
        <h2>{name}</h2>
        <div>
          <InputNumber
            count={quantity}
            handleAddCount={handleAddCount}
            handleSubtractCount={handleSubtractCount}
          />
          <ButtonWithIcon
            Icon={Trash}
            text="REMOVER"
            onClick={handleRemoveItemFromCart}
          />
        </div>
      </PurchaseInfoWrapper>
      <InformationSpan>{adjustedPrice}</InformationSpan>
    </PurchaseConfirmationCardContainer>
  )
}

const PurchaseConfirmationCardContainer = styled.div`
  max-width: 24.25rem;
  background: ${(props) => props.theme['--base-card']};
  padding: 0.5rem 0.25rem;

  display: flex;
  align-items: start;
  justify-content: space-between;

  img {
    width: 4rem;
    height: 4rem;
    object-fit: contain;
  }
`

const InformationSpan = styled.span`
  white-space: nowrap;

  ${textM}
  font-weight: bold;
  color: ${(props) => props.theme['--base-text']};
`

const PurchaseInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;

  h2 {
    color: ${(props) => props.theme['--base-subtitle']};
    ${textM}
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`
