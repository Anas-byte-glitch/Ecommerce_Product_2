import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Category from './pages/Category'
import Collection from './pages/Collection'
import ProductDetail from './pages/ProductDetail'
import Favourites from './pages/Favourites'
import About from './pages/About'
import Contact from './pages/Contact'
import Journals from './pages/Journals'
import JournalArticle from './pages/JournalArticle'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import { getProduct } from './data/products'

// Same URL paths as the reference (docs/SITE_MAP.md).
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/women-category', element: <Category audience="women" /> },
      { path: '/men-category', element: <Category audience="men" /> },
      { path: '/women-category/:collection', element: <Collection audience="women" /> },
      { path: '/men-category/:collection', element: <Collection audience="men" /> },
      {
        path: '/product/:slug',
        element: <ProductDetail />,
        handle: { title: (params) => getProduct(params.slug)?.name },
      },
      { path: '/favourite', element: <Favourites /> },
      { path: '/cart', element: <Cart />, handle: { title: () => 'Cart' } },
      { path: '/checkout', element: <Checkout />, handle: { title: () => 'Checkout' } },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/journals', element: <Journals /> },
      { path: '/journals/:slug', element: <JournalArticle /> },
      { path: '/terms', element: <Legal type="terms" /> },
      { path: '/privacy-policy', element: <Legal type="privacy" /> },
      { path: '/refund-policy', element: <Legal type="refund" /> },
      { path: '/404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
