import { site } from '../../config/site'

// Brand start upright + end in italic (site.wordmark), as on the reference navbar.
export default function Wordmark() {
  return (
    <>
      {site.wordmark.start}
      <span className="italic">{site.wordmark.end}</span>
    </>
  )
}
