import {
  CardsWrapper,
  Container,
  DeliveryInfoContainer,
  DeliveryInfoWrapper,
  PurchasedProductsWrapper,
} from './styles'

import { MapPin, CurrencyDollar, Clock } from '@phosphor-icons/react'

import DeliveryImg from '../../assets/images/decoration/delivery.svg'
import LogoImg from '../../assets/images/decoration/banner.svg'

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { AxiosResponse } from 'axios'
import { PaymentOptions } from '../../components/PaymentSelectRadio'
import { differenceInMinutes, subHours } from 'date-fns'
import { PurchaseProductHistoryCard } from '../../components/PurchaseProductHistoryCard'
import { PurchaseProductProps } from '../../@types/purchase_product'

interface PurchaseDetailsProps {
  id: string
  user_id: string
  purchase_date: string
  delivery_address: string
  payment_type: PaymentOptions
  products_purchase: PurchaseProductProps[]
}

const paymentTypesObject = {
  'credit-card': 'Cartão de crédito',
  'debt-card': 'Cartão de débito',
  cash: 'Dinheiro',
}

export function Delivery() {
  const [purchaseDetails, setPurchaseDetails] =
    useState<PurchaseDetailsProps | null>(null)
  const { purchaseId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!purchaseId) return

    api
      .get(`purchases/${purchaseId}`)
      .then((res: AxiosResponse) => {
        setPurchaseDetails(res.data)
      })
      .catch((err) => {
        console.log(err)
        navigate('/')
      })
  }, [purchaseId, navigate])

  const [addr1, addr2] = purchaseDetails
    ? purchaseDetails.delivery_address.split('\n')
    : ['', '']

  const paymentStr = purchaseDetails
    ? paymentTypesObject[purchaseDetails.payment_type]
    : null

  // TODO: Fix datetime zone
  const minutesToDelivery = purchaseDetails
    ? differenceInMinutes(
        subHours(new Date(purchaseDetails.purchase_date), 2.5),
        new Date(),
      )
    : null

  const hasPurchaseBeenDelivered = minutesToDelivery && minutesToDelivery <= 0

  console.log(purchaseDetails)

  return (
    <Container>
      <h2>Uhu! Pedido confirmado</h2>
      <span>Agora é só aguardar que o café logo chegará até você</span>

      <CardsWrapper>
        <DeliveryInfoContainer>
          <DeliveryInfoWrapper $IconBgColor="--secondary-500">
            <MapPin weight="fill" />
            <div>
              <span>
                Entrega em <b>{addr1}</b>{' '}
              </span>
              <span>{addr2}</span>
            </div>
          </DeliveryInfoWrapper>

          <DeliveryInfoWrapper $IconBgColor="--primary-700">
            <Clock weight="fill" />
            {hasPurchaseBeenDelivered ? (
              <div>
                <span>Sua entrega foi realizada!</span>
                <span>☕☕☕</span>
              </div>
            ) : (
              <div>
                <span>Previsão de entrega</span>
                <span>{minutesToDelivery} minutos</span>
              </div>
            )}
          </DeliveryInfoWrapper>

          <DeliveryInfoWrapper $IconBgColor="--primary-500">
            <CurrencyDollar weight="fill" />
            <div>
              <span>Pagamento na entrega</span>
              <span>{paymentStr}</span>
            </div>
          </DeliveryInfoWrapper>

          <h2>Detalhes do pedido</h2>

          <PurchasedProductsWrapper>
            {purchaseDetails &&
              purchaseDetails.products_purchase.map((product) => {
                return (
                  <PurchaseProductHistoryCard
                    key={product.product_id}
                    {...product}
                  />
                )
              })}
          </PurchasedProductsWrapper>
        </DeliveryInfoContainer>

        <img
          src={hasPurchaseBeenDelivered ? LogoImg : DeliveryImg}
          alt="Imagem de um rapaz em cima de uma motocicleta levando a entrega do pedido"
        />
      </CardsWrapper>
    </Container>
  )
}
