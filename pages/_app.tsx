import '@/src/styles/variables.css'
import '@/src/styles/global.css'
import { HeaderNav } from '@/src/components/header/header'
import type { AppProps } from 'next/app'
import { MarvelContextProvider } from '@/src/context/marvel.context'
import { type ReactElement } from 'react'

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <MarvelContextProvider>
      <HeaderNav />
      <Component {...pageProps} />
    </MarvelContextProvider>
  )
}
