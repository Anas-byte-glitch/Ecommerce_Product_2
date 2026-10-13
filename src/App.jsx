import { lazy } from 'react'
import { LazyMotion } from 'motion/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import { getProduct } from './data/products'
import { getJournal } from './data/journals'

// Every page except Home is its own chunk (Home stays eager: it is the landing page and the LCP route).
const Shop = lazy(() => import('./pages/Shop'))
const Category = lazy(() => import('./pages/Category'))
const Collection = lazy(() => import('./pages/Collection'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Favourites = lazy(() => import('./pages/Favourites'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Journals = lazy(() => import('./pages/Journals'))
const JournalArticle = lazy(() => import('./pages/JournalArticle'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'))
const Cart = lazy(() => import('./pages/Cart'))

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
      { path: '/checkout/success', element: <CheckoutSuccess />, handle: { title: () => 'Order Confirmed' } },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/journals', element: <Journals /> },
      {
        path: '/journals/:slug',
        element: <JournalArticle />,
        handle: { title: (params) => getJournal(params.slug)?.title },
      },
      { path: '/terms', element: <Legal type="terms" /> },
      { path: '/privacy-policy', element: <Legal type="privacy" /> },
      { path: '/refund-policy', element: <Legal type="refund" /> },
      { path: '/404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return (
    <LazyMotion features={() => import('./utils/motionFeatures').then((module) => module.default)}>
      <RouterProvider router={router} />
    </LazyMotion>
  )
}
