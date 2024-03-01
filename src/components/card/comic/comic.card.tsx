import { type IComic } from '@/src/interfaces/characters'
import styles from './comic.card.module.css'
import Image from 'next/image'

interface IProps {
  comic: IComic
}

export const ComicCard: React.FC<IProps> = ({ comic }: IProps) => {
  const showOnSaleDate = (): number => {
    const date = new Date(comic.dates[0].date)
    return date.getFullYear()
  }

  return (
    <figure className={styles.comic} aria-label={`${comic.title} Comic`}>
      <div className={styles.comic__thumbnail}>
        <Image
          width={168}
          height={250}
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={`${comic.title} Front Page`}
          title={`${comic.title} Front Page`}
        />
      </div>
      <figcaption className={styles.comic__title} title='Comic Name'>
        {comic.title}
      </figcaption>
      <div className={styles.comic__date}>{showOnSaleDate()}</div>
    </figure>
  )
}
