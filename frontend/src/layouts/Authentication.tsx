import { Outlet } from 'react-router-dom'
import { LoginFormWrapper } from '../components/LoginFormWrapper'

export const AuthenticationLayout = () => {
  return (
    <LoginFormWrapper>
      <Outlet />
    </LoginFormWrapper>
  )
}
