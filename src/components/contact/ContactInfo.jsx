import { Mailbox, MapPin, Phone } from 'lucide-react'
import { site } from '../../config/site'

// Three blocks (support email, phone, office address) — read from src/config/site.js.
// Desktop: one row of three equal 160px cards; below 1200px they stack.
export default function ContactInfo() {
  const items = [
    { Icon: Mailbox, title: 'Customer Support', text: site.contactEmail, href: `mailto:${site.contactEmail}` },
    { Icon: Phone, title: 'Call Us', text: site.contactPhone, href: `tel:${site.contactPhone.replace(/[^+\d]/g, '')}` },
    { Icon: MapPin, title: 'Head Office', text: site.officeAddress },
  ]
  return (
    <ul className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      {items.map(({ Icon, title, text, href }) => (
        <li key={title} className="flex flex-col gap-4 p-4 lg:h-40 lg:flex-1">
          <Icon size={32} strokeWidth={2.25} aria-hidden="true" className="shrink-0 text-accent" />
          <div className="flex flex-col gap-3">
            <h3 className="text-ink type-h6-lg">{title}</h3>
            <p className="max-w-[400px] text-ink-soft type-body">
              {href ? (
                <a href={href} className="hover:text-ink">
                  {text}
                </a>
              ) : (
                text
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
