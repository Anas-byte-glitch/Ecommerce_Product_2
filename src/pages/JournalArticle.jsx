import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/ui/PagePlaceholder'
import { getJournal } from '../data/journals'
import NotFound from './NotFound'

export default function JournalArticle() {
  const { slug } = useParams()
  const journal = getJournal(slug)
  if (!journal) return <NotFound />

  return <PagePlaceholder hero eyebrow={journal.tag} title={journal.title} />
}
