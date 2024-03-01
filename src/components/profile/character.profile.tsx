import { type MouseEventHandler } from 'react'
import styles from './character.profile.module.css'
import { type ICharacter, type IComic } from '@/src/interfaces/characters'
import { FavoriteButton } from '../buttons/favorite.button'
import { ComicCard } from '../card/comic/comic.card'
import { type TErrorProfileState } from '@/src/types/state'
import Image from 'next/image'

interface IProps {
  character: ICharacter | null
  comics: IComic[] | null
  isLoadingCharacter: boolean
  isLoadingComics: boolean
  handleFavoriteClick: MouseEventHandler
  isFavorite: boolean
  error: TErrorProfileState
}

export const CharacterProfile: React.FC<IProps> = ({
  character,
  error,
  isLoadingComics,
  isLoadingCharacter,
  comics,
  isFavorite,
  handleFavoriteClick
}: IProps) => {
  const ComicsRender: React.FC = () => {
    if (isLoadingComics) return <h4>Loading...</h4>

    if (error === 'COMICS') {
      return (
        <section style={{ textAlign: 'center', paddingTop: 20 }}>
          <h4>Comics are not available at this time...</h4>
        </section>
      )
    }

    if (error === null && !isLoadingComics && comics?.length === 0) {
      return <p>No comics to show</p>
    }

    return comics?.map((comic) => <ComicCard key={comic.id} comic={comic} />)
  }

  return (
    <main className={styles['character-detail-view']}>
      <section className={`${styles['character-detail-view__header']} corner-adjust`}>
        {error === true && (
          <div style={{ textAlign: 'center', paddingTop: 80 }}>
            <h4>Opps... Character Not Found</h4>
          </div>
        )}
        <div className={styles['character-detail-view__character']}>
          <div className={styles['character-detail-view__character__thumbnail']}>
            {character != null && (
              <Image
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={`${character.name} Image`}
                title={`${character.name} Image`}
                width={278}
                height={278}
                priority
              />
            )}
          </div>
          <div className={styles['character-detail-view__character__resume']}>
            {isLoadingCharacter && <p>Loading character...</p>}
            {character != null && (
              <>
                <div className={styles['character-detail-view__character__resume__name']}>
                  <h3 className={styles['character-detail-view__character__resume__name__text']} title='Character Name'>
                    {character.name}
                  </h3>
                  <div className={styles['character-detail-view__character__resume__name__icon']}>
                    <FavoriteButton boldIcon={false} handleClick={handleFavoriteClick} isFavorite={isFavorite} />
                  </div>
                </div>
                <article
                  className={styles['character-detail-view__character__resume__description']}
                  title={`${character.name} Description`}
                >
                  {character.description.length > 0 ? character.description : "description not available..."}
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      <section className={styles['character-detail-view__comics']} title='Comics'>
        <h4 className={styles['character-detail-view__comics__title']}>Comics</h4>

        <div className={styles['character-detail-view__comics__list']}>
          <ComicsRender />
        </div>
      </section>
    </main>
  )
}
