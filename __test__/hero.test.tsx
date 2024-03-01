/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { HeaderNav } from '@/src/components/header/header'
import characterMock from './character.mock.json'
import comicsMock from './comics.mock.json'
import { CharacterProfile } from '@/src/components/profile/character.profile'

const mockProps = {
  character: characterMock[0],
  error: false,
  isLoadingComics: false,
  isLoadingCharacter: false,
  comics: comicsMock,
  isFavorite: false,
  handleFavoriteClick: () => {}
}

describe('Heros', () => {
  describe('Heros - Header Section', () => {
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

  describe('Heros - Hero Section', () => {
    beforeAll(() => {
      render(<CharacterProfile {...mockProps} />)
    })

    it('Should Render Hero', async () => {
      expect(await screen.findByAltText(`${mockProps.character.name} Image`))
      const heroTitle = await screen.findByTitle('Character Name')
      expect(heroTitle)
      expect(heroTitle.textContent).toBe(mockProps.character.name)
      expect(await screen.findByTitle(`${mockProps.character.name} Description`))
      expect((await screen.findByRole('button')).title).toBe('')
    })
  })

  describe('Heros - Hero Favorite Section', () => {
    beforeAll(() => {
      const favoriteProps = {
        ...mockProps,
        isFavorite: true
      }
      render(<CharacterProfile {...favoriteProps} />)
    })

    it('Should Render Favorite Hero', async () => {
      expect(await screen.findByAltText(`${mockProps.character.name} Image`))
      const heroTitle = await screen.findByTitle('Character Name')
      expect(heroTitle)
      expect(heroTitle.textContent).toBe(mockProps.character.name)
      expect(await screen.findByTitle(`${mockProps.character.name} Description`))
      expect((await screen.findByRole('button')).title).toBe('Favorite Character')
    })
  })

  describe('Heros - Comics Section', () => {
    beforeAll(() => {
      render(<CharacterProfile {...mockProps} />)
    })

    it('Should Render Comics', async () => {
      expect(await screen.findByTitle(`${mockProps.comics[0].title} Front Page`))
    })
  })
})
