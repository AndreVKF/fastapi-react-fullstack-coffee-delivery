import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

import { textXS, textM } from '../styles/themes/typography'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isOptional?: boolean
  width?: string
  id: string
}

export const Input = ({
  width = '',
  isOptional = false,
  id,
  ...rest
}: InputProps) => {
  const { register } = useFormContext()

  return (
    <InputContainer $width={width}>
      <input type="text" id={id} {...register(id)} {...rest} />
      {isOptional && <span>Opcional</span>}
    </InputContainer>
  )
}

interface InputContainerProps {
  $width: string
}

const InputContainer = styled.div<InputContainerProps>`
  width: ${(props) => (props.$width ? props.$width : '100%')};
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.75rem;

  background: ${(props) => props.theme['--base-input']};
  border-radius: 4px;
  border: 2px solid transparent;

  &:focus-within {
    border: 2px solid ${(props) => props.theme['--primary-700']};
  }

  input {
    width: 100%;
    border: 0;
    outline: none;
    background: transparent;

    flex: 1;

    ${textM}
    color: ${(props) => props.theme['--base-text']};

    &::placeholder {
      color: ${(props) => props.theme['--base-label']};
    }

    &:disabled {
      cursor: not-allowed;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  span {
    ${textXS}
    font-weight: 400;
    font-style: italic;
  }
`
