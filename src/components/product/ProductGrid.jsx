import { cn } from '../../utils/cn'
import Reveal from '../ui/Reveal'
import ProductCard from './ProductCard'

// Default 2 columns on phones/tablets, 3 from 1200px (`columns` overrides); 24px row / 16px column gaps. Each card fades
// in when half visible. `children` are appended as extra grid cells (e.g. a banner).
export default function ProductGrid({
  products,
  columns = 'grid-cols-2 lg:grid-cols-3',
  className,
  itemClassName,
  children,
}) {
  return (
    <div className={cn('grid items-start gap-x-4 gap-y-6', columns, className)}>
      {products.map((product) => (
        <Reveal key={product.slug} className={itemClassName}>
          <ProductCard product={product} />
        </Reveal>
      ))}
      {children}
    </div>
  )
}
