import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { products } from '../../data/products'
import { useUiStore } from '../../store/uiStore'
import { searchProducts } from '../../utils/searchProducts'
import Drawer from '../ui/Drawer'
import Image from '../ui/Image'

// Search panel (same drawer as the cart): focused input, instant results as compact rows,
// "No results" state and a "Show all" link to /shop. Not on the reference (its search is a
// Shopify-backed drawer), so it follows the project's visual language.
export default function SearchDrawer() {
  const open = useUiStore((state) => state.searchOpen)
  const close = useUiStore((state) => state.closeSearch)
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchProducts(products, query), [query])
  const searching = query.trim().length > 0

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  return (
    <Drawer open={open} onClose={close} title="Search">
      <div className="flex flex-col gap-6">
        <div className="relative">
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <Search size={18} strokeWidth={2.25} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
          <input
            id="site-search"
            data-autofocus
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            className="h-12 w-full appearance-none rounded-none border border-mist bg-white pr-4 pl-11 font-body text-base text-ink placeholder:text-muted"
          />
        </div>

        <p className="sr-only" aria-live="polite">
          {searching ? (results.length ? `${results.length} results` : 'No results') : ''}
        </p>

        {searching && results.length > 0 && (
          <ul className="divide-y divide-mist">
            {results.map((product) => (
              <li key={product.slug}>
                <Link to={`/product/${product.slug}`} onClick={close} className="flex items-center gap-4 py-3">
                  <span className="relative size-16 shrink-0 overflow-hidden bg-mist">
                    <Image src={product.images[0]} alt="" sizes="120px" className="absolute inset-0 size-full object-cover" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-ink type-h6">{product.name}</span>
                    <span className="text-ink-soft type-badge">{product.categoryLabel}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {searching && results.length === 0 && (
          <div className="flex flex-col gap-2 py-6 text-center">
            <p className="text-ink type-h6-lg">No results</p>
            <p className="text-ink-soft type-body">Try a different word, like “ring” or “chain”.</p>
          </div>
        )}

        <Link to="/shop" onClick={close} className="w-fit self-center text-ink underline underline-offset-4 type-eyebrow hover:text-ink-hover">
          Show all
        </Link>
      </div>
    </Drawer>
  )
}
