import { AppHead } from '@/src/components/metadata/head'
import { CharacterProfileContainer } from '@/src/containers/character.profile'
import { type ReactElement } from 'react'

export default function Hero(): ReactElement {
  return (
    <>
      <AppHead />
      <CharacterProfileContainer />
    </>
  )
}
