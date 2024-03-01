import { type ICharacter, type IComic } from './characters'

interface ILoading {
  isLoading: boolean
}

export interface ICharacterProfileState extends ILoading {
  character: ICharacter | null
}

export interface IComicsProfileState extends ILoading {
  comics: IComic[] | null
}
