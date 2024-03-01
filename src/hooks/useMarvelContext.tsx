import { useContext } from 'react'
import { type IMarvelContext, MarvelContext } from '../context/marvel.context'

export const useMarvelContext = (): IMarvelContext => {
  const context = useContext(MarvelContext)
  if (context === undefined) {
    throw new Error('useMarvelContext must be used within a MarvelContextProvider')
  }
  return context
}
