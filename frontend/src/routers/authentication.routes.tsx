import { Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { AuthenticationLayout } from '../layouts/Authentication'

// export const authRoutes = createBrowserRouter([
//   {
//     path: '/',
//     element: <AuthenticationLayout />,
//     children: [
//       {
//         path: '/',
//         element: <Login />,
//       },
//       {
//         path: '/register',
//         element: <Register />,
//       },
//     ],
//   },
// ])

export function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}
