// Animation settings read from the reference's Framer page data (docs/DESIGN_NOTES.md §15).

// Framer "spring, bounce 0, 1.5s" — used by every appear effect on the home page.
export const appearSpring = (delay = 0) => ({ type: 'spring', bounce: 0, duration: 1.5, delay })

// Per-word heading effect: from blur(10px), opacity 0, y 10 to rest, 0.05s apart.
export const wordEffect = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 10 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  stagger: 0.05,
  transition: { type: 'spring', bounce: 0, duration: 1.5 },
}
