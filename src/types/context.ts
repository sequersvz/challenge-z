import { type Dispatch, type SetStateAction } from 'react'
import { type ICharacter } from '../interfaces/characters'

export type FavoritesMapContext = Map<number, ICharacter>

export type FavoritesStateAction = Dispatch<SetStateAction<FavoritesMapContext>>
