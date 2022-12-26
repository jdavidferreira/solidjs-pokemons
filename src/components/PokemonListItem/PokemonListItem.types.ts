import { Ref } from 'solid-js'
import { PokemonListItem } from '../../lib/api.types'

export type PokemonListItemProps = PokemonListItem & {
  ref?: Ref<HTMLLIElement>
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
  name: string
  types: PokemonType[]
  stats: PokemonStat[]
}
