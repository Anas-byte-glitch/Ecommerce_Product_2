import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { footerColumns } from '../../config/site'

// Tablet + phone menu: the white navbar "expands" to the full viewport height.
export default function MobileMenu({ onNavigate }) {
  return (
    <motion.div
      id="mobile-menu"
      className="h-[calc(100dvh-var(--spacing-nav))] overflow-y-auto bg-white lg:hidden"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
    >
      <motion.div
        className="flex flex-col gap-8 px-4 py-16 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        {footerColumns.map((column) => (
          <div key={column.title} className="flex flex-col gap-4">
            <p className="text-muted type-link-lg">{column.title}</p>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      onClick={onNavigate}
                      className="text-ink type-nav transition-colors duration-300 hover:text-ink-hover"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink type-nav transition-colors duration-300 hover:text-ink-hover"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
