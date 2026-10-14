import Avatar from '../ui/Avatar'

// 250 × 300 card linking to Instagram: initials avatar (no photo), name + product over a bottom gradient.
export default function CustomerCard({ customer }) {
  return (
    <a
      href={customer.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block h-[300px] w-[250px] overflow-hidden bg-ink"
    >
      <div className="absolute inset-x-0 top-12 flex justify-center">
        <Avatar name={customer.name} className="size-[120px] type-h3" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-fade-up" />
      <div className="absolute inset-x-0 bottom-4 flex flex-col items-start gap-1 px-4">
        <p className="text-cream type-h6-lg">{customer.name}</p>
        <p className="w-full text-mist type-badge">{customer.product}</p>
        <span className="sr-only">(opens Instagram)</span>
      </div>
    </a>
  )
}
