import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/ui/PagePlaceholder'
import { getCollection } from '../data/collections'
import NotFound from './NotFound'

export default function Collection({ audience }) {
  const { collection: slug } = useParams()
  const collection = getCollection(audience, slug)
  if (!collection) return <NotFound />

  return <PagePlaceholder eyebrow={collection.eyebrow} title={collection.title} />
}
