import { useEffect, useState } from 'react'
import { CharactersList } from '../components/list/characters/characters.list'
import { marvelAPI } from '../services/marvel.api'
import { useMarvelContext } from '../hooks/useMarvelContext'
import { type ICharacter } from '../interfaces/characters'

interface IProps {
  showFavorites: boolean
}

export const CharacterListContainer: React.FC<IProps> = ({ showFavorites }: IProps) => {
  const { favorites, setFavorites, characters, setCharacters } = useMarvelContext()
  const [isLoading, setIsLoading] = useState(!showFavorites)
  const [tmpFavorites, setTmpFavorites] = useState(Array.from(favorites.values()))
  const [error, setError] = useState(false)

  const handleInputChange = async (nameStartsWith: string): Promise<void> => {
    try {
      setIsLoading(true)
      if (showFavorites) {
        setTmpFavorites(
          nameStartsWith.length === 0
            ? Array.from(favorites.values())
            : Array.from(favorites.values()).filter((e) =>
                e.name.toUpperCase().startsWith(nameStartsWith.toUpperCase())
              )
        )
        return
      }
      const charactersData = (
        await marvelAPI.getCharacters({
          limit: 2,
          nameStartsWith: nameStartsWith.length === 0 ? undefined : nameStartsWith
        })
      ).data
      const charactersList: ICharacter[] = charactersData.data.results
      setCharacters(charactersList)
    } catch (error) {
      console.error(error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect((): void => {
    if (showFavorites) return

    const getCharactersOnInit = async (): Promise<void> => {
      try {
        const charactersData = (await marvelAPI.getCharacters({})).data
        const charactersList: ICharacter[] = charactersData.data.results
        setCharacters(charactersList)
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    void getCharactersOnInit()
  }, [])

  return (
    <CharactersList
      favorites={favorites}
      setFavorites={setFavorites}
      characters={showFavorites ? tmpFavorites : characters}
      handleInputChange={handleInputChange}
      isLoading={isLoading}
      showFavorites={showFavorites}
      error={error}
    />
  )
}
