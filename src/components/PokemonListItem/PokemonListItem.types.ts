export type PokemonListItemProps = {
  id: number
  name: string
  url: string
}

type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

type PokemonStat = {
  base_stat: number
  stat: {
    name: string
    url: string
  }
}

export type PokemonDetails = {
  types: PokemonType[]
  stats: PokemonStat[]
}
