import { lazy } from 'react'
import { LazyMotion } from 'motion/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import { getProduct } from './data/products'
import { getJournal } from './data/journals'
import { getAudience } from './data/categories'
import { getCollection } from './data/collections'
import {
  audienceDescription,
  collectionDescription,
  pageDescriptions,
  productDescriptionForMeta,
} from './data/seo'
import { articleLd, productLd } from './seo/jsonLd'

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


const notFoundHandle = { seo: () => ({ description: pageDescriptions.notFound, noindex: true }) }

const categoryRoute = (audience) => {
  const info = getAudience(audience)
  return {
    path: `/${info.slug}`,
    element: <Category audience={audience} />,
    handle: {
      seo: () => ({ description: audienceDescription(info) }),
    },
  }
}

const collectionRoute = (audience) => {
  const info = getAudience(audience)
  return {
    path: `/${info.slug}/:collection`,
    element: <Collection audience={audience} />,
    handle: {
      seo: (params) => {
        const collection = getCollection(audience, params.collection)
        if (!collection) return { noindex: true }
        return { description: collectionDescription(collection) }
      },
    },
  }
}

// Same URL paths as the reference (docs/SITE_MAP.md).
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home />, handle: { seo: () => ({ description: pageDescriptions.home }) } },
      { path: '/shop', element: <Shop />, handle: { seo: () => ({ description: pageDescriptions.shop }) } },
      categoryRoute('women'),
      categoryRoute('men'),
      collectionRoute('women'),
      collectionRoute('men'),
      {
        path: '/product/:slug',
        element: <ProductDetail />,
        handle: {
          title: (params) => getProduct(params.slug)?.name,
          seo: (params) => {
            const product = getProduct(params.slug)
            if (!product) return { noindex: true }
            return {
              description: productDescriptionForMeta(product),
              jsonLd: [productLd(product)],
            }
          },
        },
      },
      { path: '/favourite', element: <Favourites />, handle: { seo: () => ({ description: pageDescriptions.favourites }) } },
      { path: '/cart', element: <Cart />, handle: { title: () => 'Cart', seo: () => ({ description: pageDescriptions.cart, noindex: true }) } },
      { path: '/checkout', element: <Checkout />, handle: { title: () => 'Checkout', seo: () => ({ description: pageDescriptions.checkout, noindex: true }) } },
      { path: '/checkout/success', element: <CheckoutSuccess />, handle: { title: () => 'Order Confirmed', seo: () => ({ description: pageDescriptions.checkout, noindex: true }) } },
      { path: '/about', element: <About />, handle: { seo: () => ({ description: pageDescriptions.about }) } },
      { path: '/contact', element: <Contact />, handle: { seo: () => ({ description: pageDescriptions.contact }) } },
      { path: '/journals', element: <Journals />, handle: { seo: () => ({ description: pageDescriptions.journals }) } },
      {
        path: '/journals/:slug',
        element: <JournalArticle />,
        handle: {
          title: (params) => getJournal(params.slug)?.title,
          seo: (params) => {
            const journal = getJournal(params.slug)
            if (!journal) return { noindex: true }
            return {
              description: journal.excerpt,
              jsonLd: [articleLd(journal)],
            }
          },
        },
      },
      { path: '/terms', element: <Legal type="terms" />, handle: { seo: () => ({ description: pageDescriptions.terms }) } },
      { path: '/privacy-policy', element: <Legal type="privacy" />, handle: { seo: () => ({ description: pageDescriptions.privacy }) } },
      { path: '/refund-policy', element: <Legal type="refund" />, handle: { seo: () => ({ description: pageDescriptions.refund }) } },
      { path: '/404', element: <NotFound />, handle: notFoundHandle },
      { path: '*', element: <NotFound />, handle: notFoundHandle },
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
