import Link from 'next/link'
import { FavoriteButton } from '../../buttons/favorite.button'
import styles from './Character.card.module.css'
import Image from 'next/image'
import { type ICharacter } from '@/src/interfaces/characters'

const nextImagesPx = 172

interface IProps {
  data: ICharacter
  isFavorite: boolean
  setFavorites: (data: ICharacter) => void
}

const CharacterCard: React.FC<IProps> = ({ data, isFavorite, setFavorites }: IProps) => {
  return (
    <figure className={styles['character-card']} title={`${data.name} Information`} aria-label={data.name}>
      <Link
        style={{ display: 'block', height: nextImagesPx }}
        href={`/hero/${data.id}`}
        className={styles['character-card__thumbnail']}
        title={`${data.name} Page`}
      >
        <Image
          priority
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={`${data.name} Image`}
          width={nextImagesPx}
          height={nextImagesPx}
          quality={50}
          title={`${data.name} Image`}
        />
      </Link>
      <div className={styles['character-card__splitter']} />
      <div className={`${styles['character-card__name']} corner-adjust`}>
        <figcaption className={styles['character-card__name__text']} title='Character Name'>
          {data.name}
        </figcaption>
        <div className={styles['character-card__name__icon']}>
          <FavoriteButton
            isFavorite={isFavorite}
            boldIcon={true}
            className={styles['character-card__fav-icon']}
            handleClick={(e) => {
              e.stopPropagation()
              setFavorites(data)
            }}
          />
        </div>
      </div>
    </figure>
  )
}

export default CharacterCard
