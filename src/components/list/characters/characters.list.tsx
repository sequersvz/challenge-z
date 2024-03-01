import styles from './character.list.module.css'
import { SearchInput } from '../../search/search'
import CharacterCard from '../../card/character/character.card'
import { type ICharacter } from '@/src/interfaces/characters'
import { type FavoritesMapContext } from '@/src/types/context'

interface IProps {
  characters: ICharacter[]
  favorites: FavoritesMapContext
  setFavorites: (character: ICharacter | ICharacter[]) => void
  handleInputChange: (nameStartsWith: string) => Promise<void>
  isLoading: boolean
  showFavorites: boolean
  error: boolean
}

export const CharactersList: React.FC<IProps> = ({
  characters,
  favorites,
  setFavorites,
  isLoading,
  handleInputChange,
  showFavorites,
  error
}: IProps) => {
  return (
    <main className={styles['character-list-view']}>
      {showFavorites && <h2 className={styles['character-list-title__favorites']}>FAVORITES</h2>}
      <SearchInput
        error={error}
        countResults={characters.length}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
      />

      <section className={styles['character-list-view__list']}>
        {!isLoading &&
          characters?.map((hero) => (
            <CharacterCard key={hero.id} data={hero} isFavorite={favorites.has(hero.id)} setFavorites={setFavorites} />
          ))}
      </section>
    </main>
  )
}
