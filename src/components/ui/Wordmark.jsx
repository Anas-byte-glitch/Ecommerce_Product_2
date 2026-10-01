import { site } from '../../config/site'

// "Glin" upright + "tura" italic, as on the reference navbar.
export default function Wordmark() {
  return (
    <>
      {site.wordmark.start}
      <span className="italic">{site.wordmark.end}</span>
    </>
  )
}
