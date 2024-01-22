import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { ShoppingCart } from '@phosphor-icons/react'

import { textXS } from '../styles/themes/typography'
import { useNavigate } from 'react-router-dom'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  countItemsOnCart?: number
}

export const HeaderCartButton = ({ countItemsOnCart = 0 }: ButtonProps) => {
  const navigate = useNavigate()

  function handleGoToCheckout() {
    navigate('/checkout')
  }

  return (
    <ShoppingButtonCartContainer onClick={handleGoToCheckout}>
      <ShoppingCart size={22} weight="fill" />
      {countItemsOnCart > 0 && <span>{countItemsOnCart}</span>}
    </ShoppingButtonCartContainer>
  )
}

const ShoppingButtonBaseContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;

  position: relative;

  padding: 0.5rem;
  border-radius: 6px;

  cursor: pointer;
`

const ShoppingButtonCartContainer = styled(ShoppingButtonBaseContainer)`
  background: ${(props) => props.theme['--primary-300']};

  span {
    position: absolute;
    top: -15%;
    right: -15%;

    width: 20px;
    height: 20px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${(props) => props.theme['--primary-700']};
    color: ${(props) => props.theme['--primary-300']};

    ${textXS}
    line-height: 0;
  }

  svg {
    color: ${(props) => props.theme['--primary-700']};
  }
`
