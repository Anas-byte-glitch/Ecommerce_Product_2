import { customers as defaultCustomers } from '../../data/customers'
import { cn } from '../../utils/cn'
import Marquee from '../ui/Marquee'
import SectionHeader from '../ui/SectionHeader'
import CustomerCard from './CustomerCard'

// "Featured Customers" (shared): centred header + a ticker of customer cards moving left at
// 60px/s, slowing to 40px/s on hover (reference ticker settings). On the reference this and the
// newsletter block form one section; render <Newsletter /> right after it.
export default function FeaturedCustomers({ customers = defaultCustomers, className }) {
  return (
    <section className={cn('relative bg-white pt-section', className)}>
      <div className="flex flex-col items-center gap-8 overflow-hidden">
        <SectionHeader
          eyebrow="Featured Customers"
          title="You Could Be Our Next Feature"
          align="center"
          className="w-full max-w-[843px]"
          eyebrowClassName="h-[13px]"
        />
        <Marquee speed={60} hoverSpeed={40} align="end" gapClassName="gap-4">
          {customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
