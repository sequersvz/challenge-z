import React, { useState } from 'react'
import styles from './search.module.css'
import Icon, { ICON_TYPES } from '../icon/Icon'

let timerId: NodeJS.Timeout
function textDebounce(func: (text: string) => void, wait: number) {
  return function (text: string) {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func(text)
    }, wait)
  }
}

interface Props {
  countResults: number
  isLoading: boolean
  handleInputChange: (text: string) => Promise<void>
  error: boolean
}

export const SearchInput: React.FC<Props> = ({ countResults, isLoading, handleInputChange, error }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const onInputChange = (text: string): void => {
    setInputValue(text)
    textDebounce((newText) => {
      void handleInputChange(newText)
    }, 1000)(text)
  }

  const renderText = (): string => {
    if (isLoading) return 'Loading...'
    if (error) return 'Error loading characters, try again later...'
    return `${countResults} results`
  }

  return (
    <section className={styles['search-bar']}>
      <div className={styles['search-bar__input-container']}>
        <div className={styles['search-bar__input-icon']}>
          <Icon type={ICON_TYPES.SEARCH} />
        </div>
        <input
          type='text'
          aria-labelledby='Search Icon'
          className={styles['search-bar__input-container__input']}
          placeholder='Search a character...'
          value={inputValue}
          onChange={(e) => {
            onInputChange(e.target.value)
          }}
          title='Search Characters'
        />
      </div>
      <div className={styles['search-bar__result-count']}>{renderText()}</div>
    </section>
  )
}
