import { Component, createResource, For, Suspense } from 'solid-js'
import { PokemonListItem } from '../PokemonListItem/PokemonListItem'
import { PokemonListItemProps } from '../PokemonListItem/PokemonListItem.types'
import { Loader } from '../UI/Loader/Loader'

const fetchPokemons = async () => {
  // await new Promise((r) => setTimeout(r, 1000))
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon`)
  const json = await result.json()
  return json.results
}

export const PokemonList: Component = () => {
  const [pokemons] = createResource<PokemonListItemProps[]>(fetchPokemons)

  return (
    <Suspense fallback={<Loader />}>
      <ul class="flex flex-col gap-2 p-2">
        <For each={pokemons()}>
          {(pokemon) => {
            return <PokemonListItem name={pokemon.name} url={pokemon.url} />
          }}
        </For>
      </ul>
    </Suspense>
  )
}
