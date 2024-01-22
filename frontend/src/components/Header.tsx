import styled from 'styled-components'
import { Dog, DoorOpen } from '@phosphor-icons/react'

import { paddingX } from '../styles/themes/padding'

import { HeaderCartButton } from './HeaderCartButton'
import { LocationTag } from './LocationTag'
import { Link, useNavigate } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import { useAuthContext } from '../contexts/AuthContext'

export const Header = () => {
  const { totalCount, clearCart } = useCartContext()
  const { handleLogout } = useAuthContext()

  const navigate = useNavigate()

  function handleClickLogout() {
    clearCart()
    handleLogout()
    navigate('/')
  }

  return (
    <HeaderContainer>
      <LogoWrapper to={'/'}>
        <Dog weight="bold" size={40} />
        <div>
          <h2>Lupet&#39;s</h2>
          <span>Coffee</span>
        </div>
      </LogoWrapper>
      <UserInfoWrapper>
        <LocationTag city="São Paulo" state="SP" />
        <HistoryWrapper to={'/history'}>
          <span>Histórico</span>
        </HistoryWrapper>
        <HeaderCartButton countItemsOnCart={totalCount} />
        <LogoutWrapper onClick={handleClickLogout}>
          <DoorOpen size={22} weight="fill" />
        </LogoutWrapper>
      </UserInfoWrapper>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  padding: 2rem 0;
  height: 6.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  ${paddingX}
`

const LogoWrapper = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme['--base-subtitle']};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > svg {
    color: ${(props) => props.theme['--secondary-700']};
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: start;

    h2 {
      line-height: 1;
    }
  }
`

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const LogoutWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;

  position: relative;

  padding: 0.5rem;
  border-radius: 6px;

  cursor: pointer;

  background: ${(props) => props.theme['--alert-100']};

  svg {
    color: ${(props) => props.theme['--alert-500']};
  }
`

const HistoryWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;

  position: relative;

  padding: 0.625rem 0.5rem;
  border-radius: 8px;

  cursor: pointer;

  background: ${(props) => props.theme['--primary-300']};
  color: ${(props) => props.theme['--primary-700']};
`
