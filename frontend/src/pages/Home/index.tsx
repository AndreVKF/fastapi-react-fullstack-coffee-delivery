import { ShoppingCart, Clock, Cube, Coffee } from '@phosphor-icons/react'

import BannerImg from '../../assets/images/decoration/banner.svg'
import {
  BannerContainer,
  BannerInfoWrapper,
  Container,
  ContentContainer,
  ItemsGrid,
  SpanWithIconWrapper,
  SpanWithIconsWrapper,
} from './styles'
import { PurchaseCard } from '../../components/PurchaseCard'
import { useEffect, useState } from 'react'
import { ProductProps } from '../../@types/product'
import { useAuthContext } from '../../contexts/AuthContext'
import { api } from '../../api'
import { AxiosResponse } from 'axios'

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([])
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated) return

    api
      .get('/products')
      .then((res: AxiosResponse) => {
        setProducts(res.data)
      })
      .catch(() => {
        setProducts([])
      })
  }, [isAuthenticated])

  if (products.length === 0) {
    return (
      <Container>
        <h1>Loading products...</h1>
      </Container>
    )
  }

  return (
    <Container>
      <BannerContainer>
        <BannerInfoWrapper>
          <h2>Encontre o café perfeito para qualquer hora do dia</h2>
          <p>
            Com o Lupet&#39;s Coffee você recebe seu café onde estiver, a
            qualquer hora!
          </p>

          <SpanWithIconsWrapper>
            <SpanWithIconWrapper $backgroundColor="--primary-700">
              <ShoppingCart size={16} weight="fill" />
              Compra simples e segura
            </SpanWithIconWrapper>
            <SpanWithIconWrapper $backgroundColor="--base-text">
              <Cube size={16} weight="fill" />
              Embalagem mantém o café intacto
            </SpanWithIconWrapper>
            <SpanWithIconWrapper $backgroundColor="--primary-500">
              <Clock size={16} weight="fill" />
              Entrega rápida e rastreada
            </SpanWithIconWrapper>
            <SpanWithIconWrapper $backgroundColor="--secondary-500">
              <Coffee size={16} weight="fill" />O café chega fresquinho até você
            </SpanWithIconWrapper>
          </SpanWithIconsWrapper>
        </BannerInfoWrapper>

        <img
          src={BannerImg}
          alt="Imagem de um copo de café branco com grãos de café ao seu redor em um fundo laranja"
        />
      </BannerContainer>

      <ContentContainer>
        <h3>Nossos cafés</h3>

        <ItemsGrid>
          {products &&
            products.map((product) => {
              return <PurchaseCard key={product.id} {...product} />
            })}
        </ItemsGrid>
      </ContentContainer>
    </Container>
  )
}
