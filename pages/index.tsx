import { AppHead } from '@/src/components/metadata/head'
import { CharacterListContainer } from '@/src/containers/characters.list'
import { type ReactElement } from 'react'

export default function Home(): ReactElement {
  return (
    <>
      <AppHead />
      <CharacterListContainer showFavorites={false} />
    </>
  )
}
