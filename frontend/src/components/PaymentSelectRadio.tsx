import * as RadioGroup from '@radix-ui/react-radio-group'
import styled from 'styled-components'

import { CreditCard, Bank, Money } from '@phosphor-icons/react'

import { textButtonM } from '../styles/themes/typography'

export type PaymentOptions = 'credit-card' | 'debt-card' | 'cash'

interface PaymentSelectRadioProps {
  value: PaymentOptions
  setValue: (newValue: PaymentOptions) => void
}

export const CreditCardOption = () => {
  return (
    <RadioContentContainer>
      <CreditCard size={18} />
      <span>CARTÃO DE CREDITO</span>
    </RadioContentContainer>
  )
}

export const DebtCardOption = () => {
  return (
    <RadioContentContainer>
      <Bank size={18} />
      <span>CARTÃO DE DÉBITO</span>
    </RadioContentContainer>
  )
}

export const CashCardOption = () => {
  return (
    <RadioContentContainer>
      <Money size={18} />
      <span>DINHEIRO</span>
    </RadioContentContainer>
  )
}

export const PaymentSelectRadio = ({
  value,
  setValue,
}: PaymentSelectRadioProps) => {
  return (
    <RootContainer value={value} onValueChange={setValue}>
      <RootGroup value="credit-card">
        <CreditCardOption />
      </RootGroup>

      <RootGroup value="debt-card">
        <DebtCardOption />
      </RootGroup>

      <RootGroup value="cash">
        <CashCardOption />
      </RootGroup>
    </RootContainer>
  )
}

const RootContainer = styled(RadioGroup.Root)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const RootGroup = styled(RadioGroup.Item)`
  width: 11.25rem;
  padding: 1rem;

  border-radius: 6px;
  white-space: nowrap;

  border: 0;

  background: ${(props) => props.theme['--base-button']};

  transition: background-color 0.1s;

  &:not([data-state='checked']):hover {
    background: ${(props) => props.theme['--base-hover']};
  }

  &[data-state='checked'] {
    background: ${(props) => props.theme['--secondary-300']};
    border: 2px solid ${(props) => props.theme['--secondary-500']};
  }
`

const RadioContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  min-width: 8.8rem;

  svg {
    color: ${(props) => props.theme['--secondary-700']};
  }

  span {
    ${textButtonM}
    line-height: normal;
  }
`
