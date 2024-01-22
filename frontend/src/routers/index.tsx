import { CartContextProvider } from '../contexts/CartContext'
import { AppRouter } from './app.routes'
import { AuthRouter } from './authentication.routes'
import { useAuthContext } from '../contexts/AuthContext'

export const Router = () => {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <AuthRouter />
  }

  return (
    <CartContextProvider>
      <AppRouter />
    </CartContextProvider>
  )
}
