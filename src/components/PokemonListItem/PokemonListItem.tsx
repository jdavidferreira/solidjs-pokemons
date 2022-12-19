import { Dictionary } from 'lodash'
import {
  Component,
  createMemo,
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

  const statsMap = () => {
    return details()?.stats.reduce<Dictionary<number>>((obj, stat) => {
      obj[stat.stat.name] = stat.base_stat
      return obj
    }, {})
  }
  // TODO: find out why using a memo triggers the suspense fallback for the whole list
  // const statsMap = createMemo(() => {
  //   return details()?.stats.reduce<Dictionary<number>>((obj, stat) => {
  //     obj[stat.stat.name] = stat.base_stat
  //     return obj
  //   }, {})
  // })

  const handleLoadMoreDetails = async () => {
    if (!areDetailsLoaded()) {
      setAreDetailsLoaded(true)
    }
  }

  const statsToShow = ['hp', 'attack', 'defense', 'speed']

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
          <div class="flex flex-col gap-3 p-3">
            <table class="table-fixed w-full bordershadow-sm text-xs bg-white">
              <thead>
                <tr class="bg-slate-100">
                  <th colSpan={2} class="border text-center">
                    Types
                  </th>
                </tr>
                <tr>
                  <th class="border capitalize">Primary</th>
                  <th class="border capitaliz">Secondary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border capitalize text-left">
                    {details()?.types[0].type.name}
                  </td>
                  <td class="border capitalize text-left">
                    {details()?.types[1]?.type.name || '-'}
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="table-fixed w-full bordershadow-sm text-xs bg-white">
              <thead>
                <tr class="bg-slate-100">
                  <th colSpan={statsToShow.length} class="border text-center">
                    Stats
                  </th>
                </tr>
                <tr>
                  {statsToShow.map((stat, index) => (
                    <th data-index={index} class="border capitalize text-right">
                      {stat}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {statsToShow.map((stat, index) => (
                    <td data-index={index} class="border text-right">
                      {statsMap()?.[stat]}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Show>
      </Suspense>
    </li>
  )
}
