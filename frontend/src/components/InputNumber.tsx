import styled from 'styled-components'
import { Plus, Minus } from '@phosphor-icons/react'

import { textM } from '../styles/themes/typography'

interface InputNumberProps {
  count: number
  handleAddCount: () => void
  handleSubtractCount: () => void
}

export const InputNumber = ({
  count,
  handleAddCount,
  handleSubtractCount,
}: InputNumberProps) => {
  return (
    <InputNumberContainer>
      <Minus size={18} onClick={handleSubtractCount} />
      <span>{count}</span>
      <Plus size={18} onClick={handleAddCount} />
    </InputNumberContainer>
  )
}

const InputNumberContainer = styled.div`
  height: 2.375rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.5px;

  border-radius: 6px;
  padding: 0 0.75rem;
  max-width: 4rem;

  background: ${(props) => props.theme['--base-button']};

  span {
    ${textM}
    line-height: normal;
    font-weight: bold;
  }

  svg {
    color: ${(props) => props.theme['--secondary-700']};
    cursor: pointer;
  }
`
