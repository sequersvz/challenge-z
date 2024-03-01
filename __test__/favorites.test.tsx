/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeaderNav } from '@/src/components/header/header'
import { CharacterListContainer } from '@/src/containers/characters.list'
import { CharactersList } from '@/src/components/list/characters/characters.list'
import characterMock from './character.mock.json'

const mockProps = {
  favorites: new Map([[characterMock[0].id, characterMock[0]]]),
  setFavorites: () => {},
  characters: characterMock,
  handleInputChange: async (): Promise<void> => {},
  isLoading: false,
  showFavorites: true,
  error: false
}

describe('Favorites', () => {
  describe('Favorites - Header Section', () => {
    beforeAll(() => {
      render(<HeaderNav />)
    })

    it('Link role should be 2 [Home, Favorites]', () => {
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
      links.forEach((link) => {
        if (link.title.toLowerCase().includes('home')) {
          expect(link).toHaveAttribute('href', '/')
        } else {
          expect(link).toHaveAttribute('href', '/favorites')
        }
      })
    })
  })

  describe('Favorites - Main Section', () => {
    beforeAll(() => {
      render(<CharacterListContainer showFavorites />)
    })

    it('Input should be writtable', async () => {
      await userEvent.type(screen.getByTitle('Search Characters'), 'Test')
    })

    it('Should render favorite character', () => {
      render(<CharactersList {...mockProps} />)
      const character = characterMock[0]
      screen.getByTitle(`${character.name} Information`)
      screen.getByTitle(`${character.name} Image`)
      expect(screen.getByText(`${character.name}`))
      expect(screen.getByTitle('Favorite Character'))
    })
  })
})
