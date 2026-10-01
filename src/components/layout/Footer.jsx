import { Link } from 'react-router-dom'
import { footerColumns, site } from '../../config/site'
import Button from '../ui/Button'

// Widths of the five reference payment logos, so the pills sit where the logos do.
const PAYMENT_WIDTHS = [40, 34, 53, 39, 37]

// Neutral payment pill (text label only, no brand logos), as tall as the tallest reference logo.
function PaymentBadge({ label, width }) {
  return (
    <svg
      width={width}
      height="15.2"
      viewBox={`0 0 ${width} 15.2`}
      role="img"
      aria-label={label}
      className="block shrink-0"
    >
      <rect x="0.5" y="0.5" width={width - 1} height="14.2" rx="7.1" fill="#ffffff" stroke="#222222" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="#222222"
        fontFamily="Switzer, Inter, sans-serif"
        fontSize="8.5"
        fontWeight="500"
      >
        {label}
      </text>
    </svg>
  )
}

const linkClass = 'block w-fit whitespace-nowrap text-ink type-link-lg transition-colors duration-300 hover:text-ink-hover'

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
    // will-change: own compositing layer, as on the reference (same glyph positioning).
    <footer className="bg-white will-change-transform">
      <div className="flex flex-col gap-14 px-4 py-6 md:px-6 md:pt-6 md:pb-8 lg:p-8">
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex flex-col items-start gap-6 md:w-[340px] lg:w-[412px]">
            <h2 className="text-ink type-h6-lg">{site.tagline}</h2>
            <Button to={site.footerCta.to}>{site.footerCta.label}</Button>
          </div>

          {/* Phone: 2 equal-height rows with a 40px gap, like the reference grid. */}
          <div className="grid auto-rows-fr grid-cols-2 gap-10 md:flex lg:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col items-start gap-4">
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

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-2.5 self-stretch md:w-[312px] md:self-auto">
            <h2 className="text-ink type-h6">Supported Payments</h2>
            <ul className="flex flex-wrap items-start gap-3 md:items-center">
              {site.payments.map((label, index) => (
                <li key={label}>
                  <PaymentBadge label={label} width={PAYMENT_WIDTHS[index] ?? label.length * 5 + 12} />
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
