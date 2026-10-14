// Initials avatar built from a name (no image file). Decorative: the name is always printed next to it,
// so it is hidden from assistive technology. Size / typography come from the className.
const getInitials = (name) => {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return ''
  const first = words[0][0]
  const last = words.length > 1 ? words[words.length - 1][0] : ''
  return (first + last).toUpperCase()
}

export default function Avatar({ name, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-pill bg-cream text-ink ${className}`}
    >
      {getInitials(name)}
    </span>
  )
}
