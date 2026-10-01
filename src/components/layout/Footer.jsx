import { Link } from 'react-router-dom'
import { footerColumns, site } from '../../config/site'

// Neutral payment pill (text label only, no brand logos).
function PaymentBadge({ label }) {
  const width = Math.round(label.length * 6.6 + 20)
  return (
    <svg
      width={width}
      height="22"
      viewBox={`0 0 ${width} 22`}
      role="img"
      aria-label={label}
      className="shrink-0"
    >
      <rect x="0.5" y="0.5" width={width - 1} height="21" rx="10.5" fill="#ffffff" stroke="#222222" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="#222222"
        fontFamily="Switzer, Inter, sans-serif"
        fontSize="11"
        fontWeight="500"
      >
        {label}
      </text>
    </svg>
  )
}

const linkClass = 'text-ink type-link-lg transition-colors duration-300 hover:text-ink-hover'

function FooterLink({ link }) {
  if (link.to) {
    return (
      <Link to={link.to} className={linkClass}>
        {link.label}
      </Link>
    )
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {link.label}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="flex flex-col gap-14 px-4 py-6 md:px-6 md:pt-6 md:pb-8 lg:p-8">
        <div className="flex flex-col gap-16 md:flex-row md:justify-between md:gap-10">
          <h2 className="text-ink type-h6-lg md:max-w-[340px] lg:max-w-[412px]">{site.tagline}</h2>

          <div className="grid grid-cols-2 gap-x-10 gap-y-[72px] md:flex md:gap-10 lg:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <p className="text-muted type-link-lg">{column.title}</p>
                <ul className="flex flex-col gap-2 md:h-[160.5px] md:justify-between md:gap-0 lg:h-[158px]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-ink type-h6">Supported Payments</h2>
            <ul className="flex flex-wrap items-center gap-3">
              {site.payments.map((label) => (
                <li key={label}>
                  <PaymentBadge label={label} />
                </li>
              ))}
            </ul>
          </div>

          <p aria-hidden="true" className="whitespace-nowrap text-ink type-wordmark-xl">
            {site.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
