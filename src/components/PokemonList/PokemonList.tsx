import { Component, createResource, For, Suspense } from 'solid-js'
import { PokemonListItem } from '../PokemonListItem/PokemonListItem'
import { PokemonListItemProps } from '../PokemonListItem/PokemonListItem.types'
import { Loader } from '../UI/Loader/Loader'

const fetchPokemons = async () => {
  await new Promise((r) => setTimeout(r, 1000))
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon`)
  const json = await result.json()

  const mapped = (json.results as PokemonListItemProps[]).map((item) => {
    return {
      ...item,
      id: Number(
        item.url.substring(
          item.url.search(/\/(\d)+\//) + 1,
          item.url.length - 1
        )
      ),
    }
  })

  return mapped
}

export const PokemonList: Component = () => {
  const [pokemons] = createResource<PokemonListItemProps[]>(fetchPokemons)

  return (
    <Suspense fallback={<Loader />}>
      <ul class="flex flex-col gap-2">
        <For each={pokemons()}>
          {(pokemon) => {
            return <PokemonListItem {...pokemon} />
          }}
        </For>
      </ul>
    </Suspense>
  )
}
