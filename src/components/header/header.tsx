import { useEffect } from 'react'
import styles from './header.module.css'
import logo from '../../../public/assets/images/logo.png'
import Icon, { ICON_TYPES } from '../icon/Icon'
import Link from 'next/link'
import Image from 'next/image'
import { useMarvelContext } from '@/src/hooks/useMarvelContext'
import { type ICharacter } from '@/src/interfaces/characters'

export const HeaderNav: React.FC = () => {
  const { favorites, setFavorites } = useMarvelContext()

  useEffect(() => {
    if (localStorage?.getItem('MarvelAppFavorites') !== null) {
      const parsed: ICharacter[] = JSON.parse(localStorage.getItem('MarvelAppFavorites') ?? '')
      setFavorites(parsed)
    }
  }, [])
  return (
    <header className={styles.header}>
      <Link href={'/'} className={styles.header__logo} title='Home Page' role='link'>
        <Image src={logo} alt='Marvel Logo' priority />
      </Link>
      <Link href={'/favorites'} className={styles['header__fav-count']} title='Favorites Page'>
        <div className={styles['header__fav-count__icon']}>
          <Icon type={ICON_TYPES.HEART} />
        </div>
        <div className={styles['header__fav-count__text']}>{favorites.size}</div>
      </Link>
    </header>
  )
}
