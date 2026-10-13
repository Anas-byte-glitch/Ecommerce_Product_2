import { useId, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'

// White cards stacked 10px apart (`gap`; the FAQ uses 16px and a wider body); several can be open at once (as on the reference). The "+"
// turns 45° into an "×" and the body expands (spring, bounce 0.2, 0.4s). All closed by default.
export default function Accordion({ items, gap = 'gap-2.5', bodyClassName = 'max-w-[515px]', headingAs: Heading = 'h3' }) {
  const [open, setOpen] = useState(() => new Set())
  const reduceMotion = useReducedMotion()
  const baseId = useId()
  const transition = reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0.2, duration: 0.4 }

  const toggle = (index) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  return (
    <div className={`flex w-full flex-col ${gap}`}>
      {items.map((item, index) => {
        const isOpen = open.has(index)
        const panelId = `${baseId}-panel-${index}`
        return (
          <div key={item.title} className="w-full bg-white">
            <Heading>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer items-center gap-3 p-4 text-left text-ink"
              >
                <span className="flex-1 type-h6-lg">{item.title}</span>
                <m.span
                  aria-hidden="true"
                  className="grid size-4 shrink-0 place-items-center"
                  initial={false}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={transition}
                >
                  <Plus size={16} strokeWidth={2} />
                </m.span>
              </button>
            </Heading>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-label={item.title}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={transition}
                  className="overflow-hidden"
                >
                  <p className={`px-4 pb-4 text-ink-soft type-body ${bodyClassName}`}>{item.content}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
