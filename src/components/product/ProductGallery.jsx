import { useState } from 'react'
import { cn } from '../../utils/cn'
import Badge from '../ui/Badge'

// Main image (640px tall, 550 on phones) + a row of 4 thumbnails (163 × 196 ratio, 8px gap,
// 10px below). Clicking a thumbnail shows it in the main box; inactive thumbs are dimmed 25%.
// "Best Seller" (dark badge) sits top-right with 16px inset.
export default function ProductGallery({ images, name, badge }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="relative h-[550px] w-full overflow-hidden bg-mist md:h-[640px]">
        <img src={images[active]} alt={name} className="absolute inset-0 size-full object-cover" />
        {badge && (
          <div className="absolute inset-x-0 top-0 flex justify-end p-4">
            <Badge variant="dark">{badge}</Badge>
          </div>
        )}
      </div>
      <div className="flex w-full gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1} of ${images.length}`}
            aria-pressed={index === active}
            className="relative aspect-[163/196.1] flex-1 cursor-pointer overflow-hidden bg-mist"
          >
            <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
            <span
              aria-hidden="true"
              className={cn('absolute inset-0 bg-black/25 transition-opacity duration-300', index === active && 'opacity-0')}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
