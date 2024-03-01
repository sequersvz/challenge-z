import axios from 'axios'
import { type ICharactersQueries } from '../interfaces/api'

const apiKey = process.env.NEXT_PUBLIC_MARVEL_API_KEY

if ((process.env.NEXT_PUBLIC_MARVEL_API_KEY ?? '').length === 0) {
  throw new Error('API KEY IS NOT BEING LOADED')
}

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MARVEL_API_URL,
  headers: { 'Content-Type': 'application/json' },
  params: {
    apikey: apiKey
  }
})

const marvelAPI = {
  getCharacters: async ({ limit = 50, nameStartsWith, offset = 0 }: ICharactersQueries) => {
    return await API.get('/characters', {
      params: {
        limit,
        offset,
        nameStartsWith
      }
    })
  },
  getCharacter: async (id: number) => {
    return await API.get(`/characters/${id}`)
  },
  getComics: async (id: number, limit = 20) => {
    return await API.get(`/characters/${id}/comics`, {
      params: {
        limit
      }
    })
  }
}

export { marvelAPI }
