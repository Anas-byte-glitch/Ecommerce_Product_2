import { cn } from '../../utils/cn'
import Container from '../ui/Container'
import HoverTile from '../ui/HoverTile'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

// Tile rows (indexes into the audience's 7 collections). Desktop widths: row 1 = 960 + 400,
// row 2 = 680 + 680, row 3 = 960 + 400 (men: mirrored 400 + 960), row 4 = one 1376 × 800 tile.
// Tablet: two equal columns (468 each), last tile 952 × 800. Phone: one column of 460px tiles.
const rows = [
  { tiles: [0, 1], lg: 'lg:grid-cols-[960fr_400fr]' },
  { tiles: [2, 3], lg: 'lg:grid-cols-2' },
  { tiles: [4, 5], lg: 'lg:grid-cols-[960fr_400fr]', mirroredLg: 'lg:grid-cols-[400fr_960fr]' },
  { tiles: [6], lg: '' },
]

// "/ Browse … Collections /" header + the 7 collection tiles of one audience.
export default function CollectionBento({ audience, label, title, collections }) {
  return (
    <section className="pt-section-sm lg:pt-section">
      <Container className="flex flex-col gap-8">
        <SectionHeader
          eyebrow={label}
          title={title}
          align="center"
          className="mx-auto w-full max-w-[800px] px-4 md:px-6 lg:px-8"
        />
        <div className="flex flex-col gap-4">
          {rows.map((row) => {
            const tall = row.tiles.length === 1
            const lg = audience === 'men' && row.mirroredLg ? row.mirroredLg : row.lg
            return (
              <div key={row.tiles[0]} className={cn('grid gap-4', tall ? 'grid-cols-1' : 'md:grid-cols-2', lg)}>
                {row.tiles.map((index) => {
                  const collection = collections[index]
                  return (
                    <Reveal key={collection.slug}>
                      <HoverTile
                        title={collection.tileLabel}
                        to={`/${audience}-category/${collection.slug}`}
                        image={collection.image}
                        className={tall ? 'h-[460px] md:h-[800px]' : 'h-[460px] md:h-[500px]'}
                        titleClassName={tall ? 'type-h2' : 'type-h3'}
                      />
                    </Reveal>
                  )
                })}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
