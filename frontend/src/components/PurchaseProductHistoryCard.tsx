import styled from 'styled-components'

import { PurchaseProductProps } from '../@types/purchase_product'
import { useEffect, useState } from 'react'

export function PurchaseProductHistoryCard(product: PurchaseProductProps) {
  const [image, setImage] = useState('')

  const { image_url, quantity, name } = product

  useEffect(() => {
    import(image_url).then((image) => setImage(image.default))
  }, [image_url])

  return (
    <Container>
      {image && <img src={image} alt={name} />}
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
