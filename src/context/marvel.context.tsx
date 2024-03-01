import { createContext, useState } from 'react'
import { type ICharacter } from '../interfaces/characters'
import { type FavoritesMapContext } from '../types/context'

export interface IMarvelContext {
  favorites: FavoritesMapContext
  setFavorites: (character: ICharacter | ICharacter[]) => void
  characters: ICharacter[]
  setCharacters: (character: ICharacter[]) => void
}

interface IProps {
  children: React.ReactNode
}

const initialContext = {
  favorites: new Map(),
  setFavorites: () => {},
  characters: [],
  setCharacters: () => {}
}

export const MarvelContext = createContext<IMarvelContext>(initialContext)

const MarvelContextProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [favorites, setFavorites] = useState<FavoritesMapContext>(new Map())
  const [characters, setCharacters] = useState<ICharacter[]>([])

  const handleStoredFavorites = (favoriteCharacter: ICharacter | ICharacter[]): void => {
    const newFavorites = new Map(favorites)
    if (Array.isArray(favoriteCharacter)) {
      favoriteCharacter.forEach((item: ICharacter) => {
        newFavorites.set(item.id, item)
      })

      setFavorites(newFavorites)
      return
    }

    const favoriteExist = newFavorites.has(favoriteCharacter.id)

    if (favoriteExist) {
      newFavorites.delete(favoriteCharacter.id)
    } else {
      newFavorites.set(favoriteCharacter.id, favoriteCharacter)
    }
    setFavorites(newFavorites)
    const toStoredItems = Array.from(newFavorites.values())

    if (toStoredItems.length === 0) {
      localStorage.removeItem('MarvelAppFavorites')
      return
    }

    localStorage.setItem('MarvelAppFavorites', JSON.stringify(toStoredItems))
  }

  const state = {
    favorites,
    setFavorites: handleStoredFavorites,
    characters,
    setCharacters
  }

  return <MarvelContext.Provider value={state}>{children}</MarvelContext.Provider>
}

export { MarvelContextProvider }
