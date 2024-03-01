import React, { type MouseEventHandler } from 'react'
import styles from './favorite.button.module.css'
import Icon, { ICON_TYPES } from '../icon/Icon'

interface Props {
  boldIcon: boolean
  isFavorite: boolean
  className?: string
  handleClick: MouseEventHandler
}

export const FavoriteButton: React.FC<Props> = ({ boldIcon, isFavorite, handleClick, className }) => {
  const getIconType = (): string => {
    if (isFavorite) {
      return ICON_TYPES.HEART
    }

    if (boldIcon) {
      return ICON_TYPES.HEART_LINE_BOLD
    }

    return ICON_TYPES.HEART_LINE
  }

  return (
    <div
      className={styles['favorite-button']}
      onClick={handleClick}
      role='button'
      title={isFavorite ? 'Favorite Character' : ''}
    >
      <Icon type={getIconType()} className={className} />
    </div>
  )
}
