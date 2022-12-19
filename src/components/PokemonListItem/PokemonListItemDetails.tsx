import { Dictionary } from 'lodash'
import { Component, createMemo, Show } from 'solid-js'
import { PokemonListItemDetailsProps } from './PokemonListItemDetails.types'

export const PokemonListItemDetails: Component<PokemonListItemDetailsProps> = (
  props
) => {
  const statsMap = createMemo(() => {
    return props.details?.stats.reduce<Dictionary<number>>((obj, stat) => {
      obj[stat.stat.name] = stat.base_stat
      return obj
    }, {})
  })

  const typesTitles = ['Primary', 'Secondary']
  const typesNames = [
    props.details?.types[0].type.name,
    props.details?.types[1]?.type.name,
  ]
  const statsToShow = ['hp', 'attack', 'defense', 'speed']

  return (
    <Show when={props.details}>
      <div class="flex flex-col gap-3 p-3">
        <table class="table-fixed w-full bordershadow-sm text-xs bg-white">
          <thead>
            <tr class="bg-slate-100">
              <th colSpan={2} class="border text-center">
                Types
              </th>
            </tr>
            <tr>
              {typesTitles.map((typeTitle, index) => (
                <th
                  data-index={index}
                  class="border capitalize text-center bg-slate-50"
                >
                  {typeTitle}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {typesNames.map((type, index) => (
                <td data-index={index} class="border capitalize text-center">
                  {type || '-'}
                </td>
              ))}
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
                <th
                  data-index={index}
                  class="border capitalize text-center bg-slate-50"
                >
                  {stat}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {statsToShow.map((stat, index) => (
                <td data-index={index} class="border text-center">
                  {statsMap()?.[stat]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Show>
  )
}
