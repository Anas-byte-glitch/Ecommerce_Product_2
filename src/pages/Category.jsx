import PagePlaceholder from '../components/ui/PagePlaceholder'
import { getAudience } from '../data/categories'

export default function Category({ audience }) {
  const category = getAudience(audience)
  return <PagePlaceholder hero eyebrow={category.eyebrow} title={category.title} />
}
