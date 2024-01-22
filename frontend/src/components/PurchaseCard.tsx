import styled from 'styled-components'

import { InputNumber } from './InputNumber'

import {
  textTag,
  titleS,
  textM,
  textS,
  titleM,
} from '../styles/themes/typography'
import { ButtonAddToCart } from './ButtonAddToCart'
import { ProductProps } from '../@types/product'
import { formatNumberToCurrency } from '../utils/formatNumberToCurrency'
import { useEffect, useState } from 'react'
import { CartProduct, useCartContext } from '../contexts/CartContext'
import { toast } from 'react-toastify'

export const PurchaseCard = (product: ProductProps) => {
  const [purchaseQtt, setPurchaseQtt] = useState(1)
  const [image, setImage] = useState('')
  const { addItemToCart } = useCartContext()

  const { image_url, description, name, price, tags } = product
  const [prefix, adjustedPrice] = formatNumberToCurrency(price).split(/\s/)

  function handleAddPurchaseQtt() {
    const newPurchaseQtt = purchaseQtt + 1
    if (newPurchaseQtt >= 10) return

    setPurchaseQtt(newPurchaseQtt)
  }

  function handleSubtractQtt() {
    const newPurchaseQtt = purchaseQtt - 1
    if (newPurchaseQtt <= 0) return

    setPurchaseQtt(newPurchaseQtt)
  }

  function handleAddItemToCart() {
    const newCartItem: CartProduct = { ...product, quantity: purchaseQtt }

    addItemToCart(newCartItem)
    toast.success('Item adicionado')
  }

  useEffect(() => {
    import(image_url).then((image) => setImage(image.default))
  }, [image_url])

  return (
    <CoffeeCardContainer>
      <img src={image} alt={description} />
      <CoffeTypeWrapper>
        {tags.map((tagObject) => {
          const { id, tag } = tagObject
          return <CoffeTypeSpan key={id}>{tag}</CoffeTypeSpan>
        })}
      </CoffeTypeWrapper>
      <h2>{name}</h2>
      <p>{description}</p>

      <ShopDetailsWrapper>
        <PriceWrapper>
          {prefix} <span>{adjustedPrice}</span>
        </PriceWrapper>
        <div>
          <InputNumber
            count={purchaseQtt}
            handleAddCount={handleAddPurchaseQtt}
            handleSubtractCount={handleSubtractQtt}
          />
          <ButtonAddToCart onClick={handleAddItemToCart} />
        </div>
      </ShopDetailsWrapper>
    </CoffeeCardContainer>
  )
}

const CoffeeCardContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 16rem;

  background: ${(props) => props.theme['--base-card']};

  border-top-right-radius: 36px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 36px;
  border-bottom-right-radius: 6px;

  padding: 0 1.5rem 0.75rem;

  img {
    width: 7.5rem;
    height: 7.5rem;
    object-fit: contain;

    margin-top: -24px;
  }

  h2 {
    margin-top: 1rem;
    ${titleS}
    color: ${(props) => props.theme['--base-subtitle']};
  }

  p {
    margin-top: 0.5rem;
    ${textM}
    text-align: center;
    color: ${(props) => props.theme['--base-label']};
  }
`

const CoffeTypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`

const CoffeTypeSpan = styled.span`
  background: ${(props) => props.theme['--primary-300']};
  color: ${(props) => props.theme['--primary-700']};

  padding: 0.25rem 0.5rem;
  border-radius: 100px;
  margin-top: 1rem;
  ${textTag}
`

const ShopDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  margin-top: 2rem;
  margin-bottom: 1.25rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

const PriceWrapper = styled.span`
  ${textS}

  span {
    ${titleM}
    font-size: 1.75rem;
  }
`
