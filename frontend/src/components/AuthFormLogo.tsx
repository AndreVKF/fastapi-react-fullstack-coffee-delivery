import styled from 'styled-components'
import { Dog } from '@phosphor-icons/react'

import { titleL, textL } from '../styles/themes/typography'

export const AuthFormLogo = () => {
  return (
    <AuthFormLogoWrapper>
      <Dog weight="bold" size={48} />
      <div>
        <h4>Lupet&#39;s</h4>
        <span>Coffee</span>
      </div>
    </AuthFormLogoWrapper>
  )
}

const AuthFormLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  > svg {
    color: ${(props) => props.theme['--secondary-700']};
  }

  > div {
    display: flex;
    flex-direction: column;

    > h4 {
      ${titleL}
      line-height: 1;
    }

    > span {
      ${textL}
      line-height: 1;
    }
  }
`
