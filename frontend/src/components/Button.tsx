import { ButtonHTMLAttributes } from 'react'

import { textButtonG } from '../styles/themes/typography'
import styled from 'styled-components'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export const Button = ({ text, ...rest }: ButtonProps) => {
  return (
    <ButtonContainerBase {...rest}>
      <span>{text}</span>
    </ButtonContainerBase>
  )
}

const ButtonContainerBase = styled.button`
  width: 100%;

  border-radius: 6px;
  border: 0;
  outline: 0;

  min-width: 8.25rem;
  padding: 0.75rem;

  background: ${(props) => props.theme['--primary-500']};

  transition: background-color 0.1s;
  cursor: pointer;

  span {
    color: ${(props) => props.theme['--white']};
    ${textButtonG}
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme['--primary-700']};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
