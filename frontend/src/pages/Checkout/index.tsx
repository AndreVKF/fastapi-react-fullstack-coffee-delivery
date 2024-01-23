import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import {
  PaymentOptions,
  PaymentSelectRadio,
} from '../../components/PaymentSelectRadio'
import { PurchaseConfirmationCard } from '../../components/PurchseConfirmationCard'
import {
  ClientInfoContainer,
  Container,
  FormHeaderWrapper,
  FromInputsWrapper,
  InputWrapper,
  ItemsSummaryWrapper,
  ItemsWrapper,
  NoItemsContainer,
  PaymentInfoWrapper,
  PurchaseCardsWrapper,
  PurchaseInfoContainer,
  PurchasedItemsWrapper,
  TotalsSpan,
} from './styles'

import { MapPin, CurrencyDollar } from '@phosphor-icons/react'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useCartContext } from '../../contexts/CartContext'
import { formatNumberToCurrency } from '../../utils/formatNumberToCurrency'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { api } from '../../api'
import { toast } from 'react-toastify'

const checkoutFormValidationSchema = zod.object({
  address_po: zod.string().min(1, 'Favor informar o Cep'),
  address_street: zod.string().optional(),
  address_number: zod.string().optional(),
  address_complement: zod.string().optional(),
  address_district: zod.string().optional(),
  address_city: zod.string().optional(),
  address_state: zod.string().optional(),
})

export type CheckoutValidationFormType = zod.infer<
  typeof checkoutFormValidationSchema
>

type AddressDetailsProps = {
  address_street: string
  address_district: string
  address_city: string
  address_state: string
  address_number: string
  address_complement: string
}

export function Checkout() {
  const { cartItems, totalPayment } = useCartContext()
  const { userId } = useAuthContext()
  const { clearCart } = useCartContext()
  const [addressDetails, setAddressDetails] = useState<AddressDetailsProps>({
    address_street: '',
    address_district: '',
    address_city: '',
    address_state: '',
    address_number: '',
    address_complement: '',
  })
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentOptions>('credit-card')

  const navigate = useNavigate()

  const methods = useForm<CheckoutValidationFormType>({
    resolver: zodResolver(checkoutFormValidationSchema),
  })

  const { handleSubmit, reset } = methods

  const cartTotalString = formatNumberToCurrency(totalPayment)
  const taxValue = 3.5
  const taxString = formatNumberToCurrency(taxValue)
  const paymentTotalString = formatNumberToCurrency(taxValue + totalPayment)

  function handleSubmitDeliveryAddress() {
    const products = cartItems.map((item) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
      }
    })

    const {
      address_street,
      address_city,
      address_number,
      address_state,
      address_district,
    } = addressDetails

    const deliveryAddress = `${address_street}, ${address_number}\n${address_district} - ${address_city}/${address_state}`

    const data = {
      user_id: userId,
      products,
      payment_type: paymentMethod,
      delivery_address: deliveryAddress,
    }

    api
      .post('/purchases/', data)
      .then((res: AxiosResponse) => {
        const purchaseId = res.data.id

        reset()
        clearCart()
        navigate(`/delivery/${purchaseId}`)
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: AxiosError | any) => {
        const errorMessage = err.response?.data?.detail
        if (errorMessage) {
          toast.error(errorMessage)
        }
        console.log(err)
      })
  }

  function handlePOSubmit(data: CheckoutValidationFormType) {
    const { address_po } = data

    axios
      .get(`https://viacep.com.br/ws/${address_po}/json/`)
      .then((res: AxiosResponse) => {
        const { bairro, localidade, logradouro, uf } = res.data

        const address = {
          address_street: logradouro,
          address_district: bairro,
          address_city: localidade,
          address_state: uf,
          address_number: addressDetails.address_number,
          address_complement: addressDetails.address_complement,
        }

        setAddressDetails(address)
      })
      .catch((err) => {
        console.log(err)
        toast.error('CEP inválido')
      })
  }

  function setAddressNumber(event: ChangeEvent<HTMLInputElement>) {
    setAddressDetails((prev) => {
      return { ...prev, address_number: event.target.value }
    })
  }

  function setAddressComplement(event: ChangeEvent<HTMLInputElement>) {
    setAddressDetails((prev) => {
      return { ...prev, address_complement: event.target.value }
    })
  }

  function handleChangePaymentMethod(newValue: PaymentOptions) {
    setPaymentMethod(newValue)
  }

  const isAddressFormFilled = Object.entries(addressDetails).reduce(
    (acc, [key, value]) => {
      if (key === 'address_complement') return !!true && !!acc

      return !!value && !!acc
    },
    true,
  )

  return (
    <Container>
      <ClientInfoContainer>
        <h2>Complete seu pedido</h2>
        <FormProvider {...methods}>
          <form id="delivery-form" onSubmit={handleSubmit(handlePOSubmit)}>
            <FormHeaderWrapper $iconColor="--primary-500">
              <MapPin size={22} />
              <div>
                <h3>Endereço de Entrega</h3>
                <span>Informe o CEP de onde deseja receber seu pedido</span>
              </div>
            </FormHeaderWrapper>
            <FromInputsWrapper>
              <InputWrapper style={{ marginBottom: '3.2rem' }}>
                <Input
                  placeholder="CEP"
                  width="12.5rem"
                  id="address_po"
                  type="number"
                  pattern="[0-9]{0, 9}"
                  maxLength={9}
                />
                <Button text="Buscar CEP" type="submit" />
              </InputWrapper>
              <InputWrapper>
                <Input
                  placeholder="Rua"
                  id="address_street"
                  disabled
                  value={addressDetails.address_street}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  placeholder="Número"
                  width="12.5rem"
                  id="address_number"
                  value={addressDetails.address_number}
                  onChange={setAddressNumber}
                />

                <Input
                  placeholder="Complemento"
                  isOptional={true}
                  id="address_complement"
                  value={addressDetails.address_complement}
                  onChange={setAddressComplement}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  placeholder="Bairro"
                  width="12.5rem"
                  id="address_district"
                  disabled
                  value={addressDetails.address_district}
                />
                <Input
                  placeholder="Cidade"
                  id="address_city"
                  disabled
                  value={addressDetails.address_city}
                />
                <Input
                  placeholder="UF"
                  width="3.75rem"
                  id="address_state"
                  disabled
                  value={addressDetails.address_state}
                />
              </InputWrapper>
            </FromInputsWrapper>
          </form>
        </FormProvider>

        <PaymentInfoWrapper>
          <FormHeaderWrapper $iconColor="--secondary-500">
            <CurrencyDollar size={22} />
            <div>
              <h3>Pagamento</h3>
              <span>
                O pagamento é feito na entrega. Escolha a forma que deseja
                pagar.
              </span>
            </div>
          </FormHeaderWrapper>

          <PaymentSelectRadio
            value={paymentMethod}
            setValue={handleChangePaymentMethod}
          />
        </PaymentInfoWrapper>
      </ClientInfoContainer>
      <PurchaseInfoContainer>
        <h2>Cafés selecionados</h2>
        <PurchasedItemsWrapper>
          <ItemsWrapper>
            {cartItems.map((item) => {
              const { id } = item

              return (
                <PurchaseCardsWrapper key={id}>
                  <PurchaseConfirmationCard {...item} />
                </PurchaseCardsWrapper>
              )
            })}
          </ItemsWrapper>

          {cartItems.length > 0 ? (
            <>
              <ItemsSummaryWrapper>
                <span>Total de itens</span>
                <span style={{ textAlign: 'right' }}>{cartTotalString}</span>

                <span>Entrega</span>
                <span style={{ textAlign: 'right' }}>{taxString}</span>

                <TotalsSpan>Total</TotalsSpan>
                <TotalsSpan style={{ textAlign: 'right' }}>
                  {paymentTotalString}
                </TotalsSpan>
              </ItemsSummaryWrapper>

              <Button
                text="CONFIRMAR PEDIDO"
                disabled={!isAddressFormFilled}
                onClick={handleSubmitDeliveryAddress}
              />
            </>
          ) : (
            <>
              <NoItemsContainer>
                <Link to={'/'}>Selecione seus cafés favoritos</Link>
              </NoItemsContainer>
            </>
          )}
        </PurchasedItemsWrapper>
      </PurchaseInfoContainer>
    </Container>
  )
}
