import { ButtonHTMLAttributes, ElementType } from 'react'
import styled from 'styled-components'

import { textButtonM } from '../styles/themes/typography'

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  Icon: ElementType
}

export const ButtonWithIcon = ({
  text,
  Icon,
  ...rest
}: ButtonWithIconProps) => {
  return (
    <ButtonWithIconContainer {...rest}>
      <Icon size={16} weight="bold" />
      <span>{text}</span>
    </ButtonWithIconContainer>
  )
}

const ButtonWithIconContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.25rem;

  border: none;
  border-radius: 6px;
  padding: 0 0.75rem;
  height: 2.375rem;

  background: ${(props) => props.theme['--base-button']};

  cursor: pointer;
  transition: background-color 0.1s;

  span {
    line-height: normal;
    color: ${(props) => props.theme['--base-text']};
    ${textButtonM}
  }

  svg {
    color: ${(props) => props.theme['--secondary-700']};
    padding-bottom: 2px;
  }

  &:hover {
    background-color: ${(props) => props.theme['--base-hover']};
  }
`
