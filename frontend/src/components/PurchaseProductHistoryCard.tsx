import styled from 'styled-components'

import { PurchaseProductProps } from '../@types/purchase_product'
import { imageMapping } from '../utils/imageMapping'

export function PurchaseProductHistoryCard(product: PurchaseProductProps) {
  const { image_url, quantity, name } = product

  const image = imageMapping(image_url)

  return (
    <Container>
      <img src={image} alt={name} />
      <div>
        <span>{name}</span>
        <span>x{quantity}</span>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  > img {
    width: 4rem;
    height: 4rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`
