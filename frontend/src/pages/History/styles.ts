import styled from 'styled-components'

import { titleXL } from '../../styles/themes/typography'
import { paddingX } from '../../styles/themes/padding'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${paddingX}
`

export const BannerWrapper = styled.div`
  > h2 {
    ${titleXL}
    color: ${(props) => props.theme['--base-title']};
  }
`

export const HistoryWrapper = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['--base-card']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['--base-subtitle']};
      font-size: 0.875rem;
      line-height: 1.6;
      border-bottom: 4px solid ${(props) => props.theme['--secondary-300']};

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    tr:not(:first-child) {
      border-top: 4px solid ${(props) => props.theme['--background']};
    }

    td {
      background-color: ${(props) => props.theme['--base-card']};
      padding: 1rem;

      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

interface DeliveryStatusProps {
  $hasPurchaseBeenDelivered: boolean
}

export const DeliveryStatus = styled.span<DeliveryStatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.$hasPurchaseBeenDelivered
        ? props.theme['--secondary-700']
        : props.theme['--primary-700']};
  }
`

export const LinkWrapper = styled(Link)`
  color: ${(props) => props.theme['--secondary-500']};

  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme['--secondary-700']};
  }
`
