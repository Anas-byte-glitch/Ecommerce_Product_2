import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Right-hand panel: full width on phones, 452px with a 24px inset from 810px (the reference's
// search/cart drawer shape, DESIGN_NOTES §9). Dimmed backdrop, Escape / backdrop click close it,
// focus is trapped inside and returned to the trigger, page scroll is locked. No slide/fade
// under prefers-reduced-motion. `footer` stays pinned below the scrolling body.
export default function Drawer({ open, onClose, title, children, footer }) {
  const reduceMotion = useReducedMotion()
  const panelRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined
    const trigger = document.activeElement
    const root = document.documentElement
    root.classList.add('overflow-hidden')
    // Focus the first control (the close button) once the panel is mounted.
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector(FOCUSABLE)?.focus())

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || !panelRef.current.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      root.classList.remove('overflow-hidden')
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus()
    }
  }, [open, onClose])

  const fade = reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.44, 0, 0.56, 1] }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex w-full flex-col bg-white md:inset-y-6 md:right-6 md:w-[452px]"
            initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '110%' }}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.5 }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-mist px-6 py-5">
              <h2 id={titleId} className="text-ink type-h6-lg">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-8 shrink-0 cursor-pointer place-items-center text-ink"
              >
                <X size={20} strokeWidth={2.25} aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
            {footer && <div className="border-t border-mist px-6 py-5">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
