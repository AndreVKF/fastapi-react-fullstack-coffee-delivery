import styled from 'styled-components'

import { ShoppingCart } from '@phosphor-icons/react'
import { ButtonHTMLAttributes } from 'react'

interface ButtonAddToCartProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonAddToCart = ({ ...rest }: ButtonAddToCartProps) => {
  return (
    <ButtonCartContainer {...rest}>
      <ShoppingCart weight="fill" size={22} />
    </ButtonCartContainer>
  )
}

const ButtonCartContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.375rem;
  height: 2.375rem;
  border: none;
  border-radius: 6px;

  background: ${(props) => props.theme['--secondary-700']};

  cursor: pointer;

  transition: background-color 0.1s;

  svg {
    color: ${(props) => props.theme['--white']};
  }

  &:hover {
    background: ${(props) => props.theme['--secondary-500']};
  }
`
