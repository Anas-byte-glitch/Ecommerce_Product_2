import PagePlaceholder from '../components/ui/PagePlaceholder'

const titles = {
  terms: { eyebrow: 'Terms', title: 'Terms & Conditions' },
  privacy: { eyebrow: 'Privacy', title: 'Privacy Policy' },
  refund: { eyebrow: 'Refund', title: 'Refund Policy' },
}

export default function Legal({ type }) {
  return <PagePlaceholder {...titles[type]} />
}
