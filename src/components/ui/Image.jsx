// The one image component. All image slots in the app go through it, so real photos can be wired in
// later (Phase 9) without touching any component:
//  • `src` is a URL string OR an object `{ src, srcSet?, webp?, width?, height? }` — change an entry of
//    `placeholders` (src/assets/placeholders/index.js) to such an object and every slot picks up the
//    srcset / WebP source automatically.
//  • `sizes` tells the browser how wide the slot is (pass it per slot when srcSet is used).
//  • Slots reserve their size with the parent's width/height or aspect-ratio classes, so nothing shifts;
//    `width` / `height` (or the object's) add the intrinsic ratio when the parent has no fixed box.
//  • `priority` is for the LCP image only: eager + fetchpriority="high". Everything else is lazy + async.
export default function Image({ src, srcSet, sizes, webp, alt = '', priority = false, width, height, className, ...rest }) {
  const source = typeof src === 'object' && src !== null ? src : { src }
  const set = srcSet ?? source.srcSet
  const webpSet = webp ?? source.webp
  const img = (
    <img
      src={source.src}
      srcSet={set}
      sizes={sizes}
      alt={alt}
      width={width ?? source.width}
      height={height ?? source.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
      {...rest}
    />
  )
  if (!webpSet) return img
  return (
    <picture>
      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      {img}
    </picture>
  )
}
