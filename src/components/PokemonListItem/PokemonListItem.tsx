import {
  Component,
  createResource,
  createSignal,
  Show,
  Suspense,
} from 'solid-js'
import { Loader } from '../UI/Loader/Loader'
import { PokemonDetails, PokemonListItemProps } from './PokemonListItem.types'

const fetchPokemonDetails = async ({
  name,
  shouldLoad,
}: {
  name: string
  shouldLoad: boolean
}) => {
  if (!shouldLoad) {
    return
  }

  await new Promise((r) => setTimeout(r, 1000))
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const json = await result.json()
  return json as PokemonDetails
}

export const PokemonListItem: Component<PokemonListItemProps> = (props) => {
  const [areDetailsLoaded, setAreDetailsLoaded] = createSignal(false)
  const [details] = createResource(
    () => ({ name: props.name, shouldLoad: areDetailsLoaded() }),
    fetchPokemonDetails
  )

  const handleLoadMoreDetails = async () => {
    if (!areDetailsLoaded()) {
      setAreDetailsLoaded(true)
    }
  }

  return (
    <li class="flex flex-col shadow hover:shadow-md hover:bg-slate-100/50 border">
      <div class="flex flex-row p-3 justify-start items-center gap-6 text-sm text-left">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`}
          alt={`${props.name} sprite`}
          loading="lazy"
          class="h-12 w-12"
        />
        <div class="capitalize flex-grow">{props.name}</div>
        <Suspense fallback={<Loader />}>
          <Show when={!details()}>
            <button
              type="button"
              onClick={handleLoadMoreDetails}
              class="underline"
            >
              Load more details
            </button>
          </Show>
        </Suspense>
      </div>

      <Suspense>
        <Show when={details()}>
          <div class="flex flex-col justify-center items-center">
            <img src={details().sprites.front_default} width={96} height={96} />
          </div>
        </Show>
      </Suspense>
    </li>
  )
}
