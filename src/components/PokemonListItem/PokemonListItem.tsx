import {
  Component,
  createResource,
  createSignal,
  Show,
  Suspense,
} from 'solid-js'
import { Loader } from '../UI/Loader/Loader'
import { PokemonDetails, PokemonListItemProps } from './PokemonListItem.types'
import { PokemonListItemDetails } from './PokemonListItemDetails'

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
  const [expanded, setExpanded] = createSignal(true)
  const [details] = createResource(
    () => ({ name: props.name, shouldLoad: areDetailsLoaded() }),
    fetchPokemonDetails
  )

  const handleLoadMoreDetails = async () => {
    if (!areDetailsLoaded()) {
      setAreDetailsLoaded(true)
    }
  }

  const toggleExpanded = () => {
    setExpanded(!expanded())
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
          <Show
            when={details()}
            fallback={
              <button
                type="button"
                onClick={handleLoadMoreDetails}
                class="underline"
              >
                Load more details
              </button>
            }
          >
            <button
              type="button"
              onClick={toggleExpanded}
              class="hover:bg-slate-100 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
                classList={{
                  'rotate-180': expanded(),
                }}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </Show>
        </Suspense>
      </div>

      <Suspense>
        <Show when={details() && expanded()}>
          <PokemonListItemDetails details={details()} />
        </Show>
      </Suspense>
    </li>
  )
}
