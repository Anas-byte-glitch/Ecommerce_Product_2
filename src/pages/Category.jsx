import AudienceCta from '../components/shared/AudienceCta'
import CollectionBento from '../components/shared/CollectionBento'
import ImageHero from '../components/shared/ImageHero'
import SharedSections from '../components/shared/SharedSections'
import { getAudience } from '../data/categories'
import { getCollectionsByAudience } from '../data/collections'

export default function Category({ audience }) {
  const category = getAudience(audience)
  const { cross } = category

  return (
    <>
      <ImageHero label={category.eyebrow} title={category.title} fade={audience} wide={audience === 'women'} />
      <div className="relative bg-white will-change-transform">
        <CollectionBento
          audience={audience}
          label={category.browseLabel}
          title={category.browseTitle}
          collections={getCollectionsByAudience(audience)}
        />
        <AudienceCta label={cross.label} title={cross.title} cta={cross.cta} to={cross.to} balanced={audience === 'men'} />
        <SharedSections />
      </div>
    </>
  )
}
