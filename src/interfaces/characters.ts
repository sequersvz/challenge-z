interface IThumbnailCollection {
  thumbnail: {
    path: string
    extension: string
  }
}

export interface ICharacter extends IThumbnailCollection {
  id: number
  name: string
  description: string
}

export interface IComic extends IThumbnailCollection {
  id: number
  title: string
  dates: Array<{
    type: string
    date: string
  }>
}
