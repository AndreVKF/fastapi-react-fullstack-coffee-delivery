import { useEffect, useState } from 'react'
import {
  BannerWrapper,
  Container,
  DeliveryStatus,
  HistoryWrapper,
  LinkWrapper,
} from './styles'
import { useAuthContext } from '../../contexts/AuthContext'
import { api } from '../../api'
import { AxiosResponse } from 'axios'
import {
  CashCardOption,
  CreditCardOption,
  DebtCardOption,
  PaymentOptions,
} from '../../components/PaymentSelectRadio'
import { PurchaseProductProps } from '../../@types/purchase_product'
import { differenceInMinutes, format, subHours } from 'date-fns'
import { formatNumberToCurrency } from '../../utils/formatNumberToCurrency'

type PurchaseProps = {
  id: string
  delivery_address: string
  payment_type: PaymentOptions
  products_purchase: PurchaseProductProps[]
  purchase_date: string
  user_id: string
}

const paymentComponentObject = {
  'credit-card': <CreditCardOption />,
  'debt-card': <DebtCardOption />,
  cash: <CashCardOption />,
}

export function History() {
  const { userId } = useAuthContext()
  const [userHistory, setUserHistory] = useState<PurchaseProps[]>([])

  useEffect(() => {
    api
      .get(`/user_purchases/${userId}`)
      .then((res: AxiosResponse) => {
        const data: PurchaseProps[] = res.data
        setUserHistory(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [userId])

  return (
    <Container>
      <BannerWrapper>
        <h2>Histórico de pedidos</h2>
      </BannerWrapper>
      <HistoryWrapper>
        <table>
          <thead>
            <tr>
              <th>Id do Pedido</th>
              <th>Data do Pedido</th>
              <th>Total</th>
              <th>Pagamento</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {userHistory.length > 0 &&
              userHistory.map((purchase) => {
                const totalPayment =
                  purchase.products_purchase.reduce((acc, prev) => {
                    return acc + prev.price * prev.quantity
                  }, 0) + 3.5

                const totalPaymentStr = formatNumberToCurrency(totalPayment)

                const minutesToDelivery = differenceInMinutes(
                  subHours(new Date(purchase.purchase_date), 2.5),
                  new Date(),
                )

                const hasPurchaseBeenDelivered = !(minutesToDelivery > 0)
                const deliveryStatus = hasPurchaseBeenDelivered
                  ? 'Entregue'
                  : 'Transporte'

                const formatedDate = format(
                  new Date(purchase.purchase_date),
                  'dd/MM/yyyy',
                )

                return (
                  <tr key={purchase.id}>
                    <td>
                      <LinkWrapper to={`/delivery/${purchase.id}`}>
                        {purchase.id}
                      </LinkWrapper>
                    </td>
                    <td>{formatedDate}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{totalPaymentStr}</td>
                    <td>{paymentComponentObject[purchase.payment_type]}</td>
                    <td>
                      <DeliveryStatus
                        $hasPurchaseBeenDelivered={hasPurchaseBeenDelivered}
                      >
                        {deliveryStatus}
                      </DeliveryStatus>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </HistoryWrapper>
    </Container>
  )
}
