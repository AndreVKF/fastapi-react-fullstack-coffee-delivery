import styled from 'styled-components'

import { titleL, textL } from '../../styles/themes/typography'
import { paddingX } from '../../styles/themes/padding'

export const Container = styled.div`
  ${paddingX}

  padding-bottom: 2rem;

  > h2 {
    ${titleL}
    color: ${(props) => props.theme['--primary-700']};
  }

  > span {
    ${textL}
    color: ${(props) => props.theme['--base-subtitle']};
  }
`

export const CardsWrapper = styled.div`
  margin-top: 2.5rem;

  display: flex;
  justify-content: space-between;

  > img {
    width: 30.75rem;
    height: 18.375rem;
    object-fit: contain;
  }
`

export const DeliveryInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem;

  position: relative;
  width: 32.875rem;

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 6px 36px;
    padding: 1px;
    z-index: -1;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme['--primary-500']},
      ${(props) => props.theme['--secondary-500']}
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`

type IconBGColors = '--secondary-500' | '--primary-500' | '--primary-700'

interface DeliveryInfoWrapperProps {
  $IconBgColor: IconBGColors
}

export const DeliveryInfoWrapper = styled.section<DeliveryInfoWrapperProps>`
  display: flex;
  gap: 0.75rem;

  > svg {
    min-height: 16px;
    min-width: 16px;

    background: ${(props) => props.theme[props.$IconBgColor]};
    padding: 0.5rem;
    color: ${(props) => props.theme['--white']};
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
  }
`

export const PurchasedProductsWrapper = styled.div`
  flex: 1;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  row-gap: 0.8rem;
`
