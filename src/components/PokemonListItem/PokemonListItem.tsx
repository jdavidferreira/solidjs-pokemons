import {
  Component,
  createResource,
  createSignal,
  Show,
  Suspense,
} from 'solid-js'
import { Loader } from '../UI/Loader/Loader'
import { PokemonListItemProps } from './PokemonListItem.types'

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
  return json
}

export const PokemonListItem: Component<PokemonListItemProps> = (props) => {
  const [areDetailsLoaded, setAreDetailsLoaded] = createSignal(false)
  const [details, { refetch }] = createResource(
    () => ({ name: props.name, shouldLoad: areDetailsLoaded() }),
    fetchPokemonDetails
  )

  const handleLoadMoreDetails = async () => {
    if (!areDetailsLoaded()) {
      setAreDetailsLoaded(true)
      refetch()
    }
  }

  return (
    <li class="flex flex-col shadow-sm hover:shadow hover:bg-slate-100/50">
      <div class="flex flex-row p-3 justify-between items-center text-sm">
        <div class="capitalize">{props.name}</div>
        <Suspense fallback={<Loader />}>
          <Show when={!details()}>
            <button type="button" onClick={handleLoadMoreDetails}>
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
