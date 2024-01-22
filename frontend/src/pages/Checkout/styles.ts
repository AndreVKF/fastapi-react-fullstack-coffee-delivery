import styled from 'styled-components'

import { paddingX } from '../../styles/themes/padding'
import {
  textS,
  textM,
  textL,
  titleXS,
  titleM,
} from '../../styles/themes/typography'

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(40rem, 56rem) 28rem;
  justify-content: space-between;
  column-gap: 2rem;

  ${paddingX}
  padding-bottom: 2.4rem;
`

export const ClientInfoContainer = styled.div`
  > h2 {
    ${titleXS}
    color: ${(props) => props.theme['--base-subtitle']};
  }

  > form {
    margin-top: 1rem;
    background: ${(props) => props.theme['--base-card']};
    padding: 2.5rem;
    border-radius: 6px;
  }
`

interface FormHeaderWrapper {
  $iconColor: '--primary-500' | '--secondary-500'
}

export const FormHeaderWrapper = styled.div<FormHeaderWrapper>`
  display: flex;
  gap: 0.5rem;

  > svg {
    color: ${(props) => props.theme[props.$iconColor]};
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    > h3 {
      color: ${(props) => props.theme['--base-subtitle']};
      ${textM}
    }

    > span {
      color: ${(props) => props.theme['--base-text']};
      ${textS}
    }
  }
`

export const FromInputsWrapper = styled.div`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const PaymentInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin-top: 0.75rem;
  padding: 2.5rem;

  background: ${(props) => props.theme['--base-card']};
  border-radius: 6px;

  > h2 {
    ${titleXS}
    color: ${(props) => props.theme['--base-subtitle']};
  }
`

export const PurchaseInfoContainer = styled.div`
  > h2 {
    ${titleXS}
    color: ${(props) => props.theme['--base-subtitle']};
    margin-bottom: 1rem;
  }
`

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const PurchaseCardsWrapper = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme['--base-button']};
`

export const PurchasedItemsWrapper = styled.div`
  background: ${(props) => props.theme['--base-card']};
  padding: 2.5rem;

  border-top-right-radius: 44px;
  border-top-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 44px;
`

export const ItemsSummaryWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  row-gap: 0.75rem;
`

export const TotalsSpan = styled.span`
  ${textL}
  font-weight: bold;
  color: ${(props) => props.theme['--base-subtitle']};
`

export const ErrorsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  > span {
    ${textS}
    color: #ef4444;
  }
`

export const NoItemsContainer = styled.div`
  width: 100%;

  > a {
    ${titleM}
    color: ${(props) => props.theme['--secondary-500']};
    transition: color 0.2s;

    &:hover {
      color: ${(props) => props.theme['--secondary-700']};
    }
  }
`
