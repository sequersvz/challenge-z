import React from 'react'
import styles from './icon.module.css'

interface Props {
  type?: string
  className?: string
}

export const ICON_TYPES = {
  HEART: '--heart',
  HEART_LINE: '--heart-line',
  HEART_LINE_BOLD: '--heart-line-bold',
  SEARCH: '--search'
}
const Icon: React.FC<Props> = ({ type, className }) => {
  return <div className={`${styles.icon} ${styles[`icon${type}`]} ${className ?? ''}`}></div>
}

export default Icon
