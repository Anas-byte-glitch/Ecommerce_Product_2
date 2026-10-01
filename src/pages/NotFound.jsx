import Button from '../components/ui/Button'
import PagePlaceholder from '../components/ui/PagePlaceholder'

export default function NotFound() {
  return (
    <PagePlaceholder eyebrow="404" title="Page Not Found">
      <Button to="/" className="mt-4">
        Back to Home
      </Button>
    </PagePlaceholder>
  )
}
