import styled from 'styled-components'

import { titleXL, textL, textM, titleL } from '../../styles/themes/typography'
import { paddingX } from '../../styles/themes/padding'

export const Container = styled.div``

export const BannerContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 3.5rem;

  ${paddingX}

  > img {
    width: 29.75rem;
    height: 22.5rem;
    object-fit: contain;
  }
`

export const BannerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 54rem;

  > h2 {
    ${titleXL}
    color: ${(props) => props.theme['--base-title']};
  }

  > p {
    ${textL}
    margin-top: 1rem;
    color: ${(props) => props.theme['--base-subtitle']};
  }
`

export const SpanWithIconsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 2.5rem;
  margin-top: 4.125rem;
`

type SpanBackgroundColors =
  | '--primary-700'
  | '--primary-500'
  | '--base-text'
  | '--secondary-500'

interface SpanWithIconWrapper {
  $backgroundColor: SpanBackgroundColors
}

export const SpanWithIconWrapper = styled.span<SpanWithIconWrapper>`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  ${textM}

  > svg {
    background: ${(props) => props.theme[props.$backgroundColor]};
    min-height: 22px;
    min-width: 22px;
    padding: 0.5rem;
    border: 0;
    border-radius: 50%;
    color: ${(props) => props.theme['--white']};
  }
`

export const ContentContainer = styled.main`
  margin-top: 2.75rem;
  padding: 2rem 0 9.75rem;

  ${paddingX}

  > h3 {
    color: ${(props) => props.theme['--base-subtitle']};
    ${titleL}
  }
`

export const ItemsGrid = styled.div`
  margin-top: 3.375rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem 2rem;
`
