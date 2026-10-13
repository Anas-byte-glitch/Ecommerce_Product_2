import Marquee from '../ui/Marquee'

const FEATURES = ['Water Safe', 'Gentle On Skin', 'All-Day Comfort', 'Quality Checked', 'Polished By Hand']

// Giant muted words separated by 12px dots, scrolling left at 40px/s (no hover slow-down).
export default function FeaturesTicker() {
  return (
    <section aria-label="Product features" className="pt-section-sm lg:pt-section">
      <Marquee speed={40} gapClassName="gap-10">
        {FEATURES.flatMap((feature) => [
          <p key={feature} className="whitespace-nowrap text-muted type-ticker">
            {feature}
          </p>,
          <span key={`${feature}-dot`} aria-hidden="true" className="block size-3 rounded-pill bg-muted" />,
        ])}
      </Marquee>
    </section>
  )
}
