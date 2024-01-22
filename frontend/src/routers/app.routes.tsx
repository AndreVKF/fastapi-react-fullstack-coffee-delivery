import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '../layouts/Default'
import { Home } from '../pages/Home'
import { Checkout } from '../pages/Checkout'
import { Delivery } from '../pages/Delivery'
import { History } from '../pages/History'

// export const appRoutes = createBrowserRouter([
//   {
//     path: '/',
//     element: <DefaultLayout />,
//     children: [
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         path: '/checkout',
//         element: <Checkout />,
//       },
//       {
//         path: '/delivery/:purchaseId',
//         element: <Delivery />,
//       },
//     ],
//   },
// ])

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/history" element={<History />} />
        <Route path="/delivery/:purchaseId" element={<Delivery />} />
      </Route>
    </Routes>
  )
}
