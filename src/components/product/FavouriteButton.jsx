import { Heart } from 'lucide-react'
import { useWishlistStore } from '../../store/wishlistStore'
import { cn } from '../../utils/cn'

// 34px white circle with an 18px heart (Phosphor "regular" → lucide stroke 1.5).
// Hover fills the heart; saved = filled accent heart (ink when hovered), as on the reference.
export default function FavouriteButton({ slug, name, className }) {
  const saved = useWishlistStore((state) => state.items.includes(slug))
  const toggle = useWishlistStore((state) => state.toggle)

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
      onClick={(event) => {
        // The button sits inside the card link.
        event.preventDefault()
        event.stopPropagation()
        toggle(slug)
      }}
      className={cn(
        'group/fav grid size-[34px] shrink-0 cursor-pointer place-items-center rounded-pill bg-white',
        saved ? 'text-accent hover:text-ink' : 'text-ink',
        className,
      )}
    >
      <Heart
        size={18}
        strokeWidth={1.5}
        aria-hidden="true"
        className={cn(saved ? 'fill-current' : 'fill-transparent group-hover/fav:fill-current')}
      />
    </button>
  )
}
