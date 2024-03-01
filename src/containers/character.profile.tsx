import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { marvelAPI } from '../services/marvel.api'
import { CharacterProfile } from '../components/profile/character.profile'
import { type IComicsProfileState, type ICharacterProfileState } from '../interfaces/state'
import { useMarvelContext } from '../hooks/useMarvelContext'
import { type TErrorProfileState } from '../types/state'

export const CharacterProfileContainer: React.FC = () => {
  const { favorites, setFavorites, characters } = useMarvelContext()
  const [comicProfile, setComicProfile] = useState<IComicsProfileState>({
    comics: null,
    isLoading: true
  })
  const [characterProfile, setCharacterProfile] = useState<ICharacterProfileState>({
    character: null,
    isLoading: true
  })
  const [error, setError] = useState<TErrorProfileState>(null)

  const {
    query: { character }
  } = useRouter()

  useEffect(() => {
    if (character === undefined) return
    const characterInt: number = Number(character)
    const getCharacter = async (): Promise<void> => {
      try {
        if (favorites.has(characterInt)) {
          setCharacterProfile({
            character: favorites.get(characterInt) ?? null,
            isLoading: false
          })
          return
        }

        const characterFindContext = characters.find((e) => e.id === characterInt)
        if (characterFindContext != null) {
          setCharacterProfile({
            character: characterFindContext,
            isLoading: false
          })
          return
        }

        const characterRequest = (await marvelAPI.getCharacter(characterInt)).data
        const characterData = characterRequest.data.results[0]
        setCharacterProfile({
          character: characterData,
          isLoading: false
        })
      } catch (error) {
        console.error(error)
        setError(true)
        setCharacterProfile({
          character: null,
          isLoading: false
        })
      }
    }

    const getComic = async (): Promise<void> => {
      try {
        const comicsRequest = (await marvelAPI.getComics(characterInt)).data
        const comicsData = comicsRequest.data.results
        setComicProfile({
          comics: comicsData,
          isLoading: false
        })
      } catch (error) {
        console.error(error)
        setError('COMICS')
        setComicProfile({
          comics: null,
          isLoading: false
        })
      }
    }
    void getComic()
    void getCharacter()
  }, [character])

  const handleFavoriteClick = (): void => {
    if (characterProfile.character === null) return
    setFavorites(characterProfile.character)
  }

  return (
    <CharacterProfile
      character={characterProfile.character}
      error={error}
      comics={comicProfile.comics}
      isFavorite={favorites.has(Number(character))}
      isLoadingCharacter={characterProfile.isLoading}
      isLoadingComics={comicProfile.isLoading}
      handleFavoriteClick={handleFavoriteClick}
    />
  )
}
