import { describe, it, expect } from 'vitest'
import { render, screen } from '@solidjs/testing-library'

import { Router } from '@solidjs/router'

import { PokemonListItemDetails } from './PokemonListItemDetails'
import { PokemonDetails } from './PokemonListItem.types'
import { PokemonListItemDetailsProps } from './PokemonListItemDetails.types'

const mockDetails: PokemonDetails = {
  name: 'pikachu',
  stats: [
    {
      base_stat: 1000,
      stat: { name: 'hp', url: '#' },
    },
    {
      base_stat: 100,
      stat: { name: 'attack', url: '#' },
    },
    {
      base_stat: 5,
      stat: { name: 'defense', url: '#' },
    },
    {
      base_stat: 25,
      stat: { name: 'speed', url: '#' },
    },
  ],
  types: [{ slot: 1, type: { name: 'electric', url: '#' } }],
}

describe(`${PokemonListItemDetails.name} component`, () => {
  const renderComponent = (
    props: PokemonListItemDetailsProps = {
      expanded: true,
      details: mockDetails,
    }
  ) => {
    return render(() => (
      <Router>
        <PokemonListItemDetails {...props} />
      </Router>
    ))
  }

  beforeEach(() => {
    renderComponent()
  })

  it('renders primary and secondary pokemon types elements', () => {
    const primaryTypeEl = screen.getByTestId('pokemonPrimaryType')

    expect(primaryTypeEl).toBeInTheDocument()
    expect(primaryTypeEl).toHaveTextContent(mockDetails.types[0].type.name)
    expect(primaryTypeEl.tagName).toBe('TD')

    const secondaryTypeEl = screen.getByTestId('pokemonSecondaryType')

    expect(secondaryTypeEl).toBeInTheDocument()
    expect(secondaryTypeEl).toHaveTextContent('-')
    expect(secondaryTypeEl.tagName).toBe('TD')
  })

  it.each(
    mockDetails.stats.map((stat) => ({
      statName: stat.stat.name,
      statValue: stat.base_stat,
    }))
  )('renders $statName stat value element', ({ statName, statValue }) => {
    const screen = renderComponent()
    const statValueEl = screen.getByTestId(`pokemonStatValue-${statName}`)

    expect(statValueEl).toHaveTextContent(String(statValue))
  })

  it('renders the link to navigate to specific pokemon details page', () => {
    const linkToPokemonPageEl = screen.getByRole('link', {
      name: 'View more',
      exact: true,
    })

    expect(linkToPokemonPageEl).toHaveAttribute('href', `/${mockDetails.name}`)
  })
})
