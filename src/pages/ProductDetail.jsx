import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/ui/PagePlaceholder'
import { getProduct } from '../data/products'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />

  return <PagePlaceholder eyebrow={product.categoryLabel} title={product.name} />
}
