import { Dictionary } from 'lodash'
import { Component, createMemo } from 'solid-js'
import { A } from '@solidjs/router'
import { PokemonListItemDetailsProps } from './PokemonListItemDetails.types'

export const PokemonListItemDetails: Component<PokemonListItemDetailsProps> = (
  props
) => {
  const statsMap = createMemo(() => {
    return props.details.stats.reduce<Dictionary<number>>((obj, stat) => {
      obj[stat.stat.name] = stat.base_stat
      return obj
    }, {})
  })

  const typesNames = () => [
    props.details.types[0].type.name,
    props.details.types[1]?.type.name,
  ]

  const typesTitles = ['Primary', 'Secondary']
  const statsToShow = ['hp', 'attack', 'defense', 'speed']

  return (
    <div
      class="flex flex-col gap-3 p-3"
      classList={{ hidden: !props.expanded }}
    >
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
            {typesNames().map((type, index) => (
              <td
                data-index={index}
                class="border capitalize text-center"
                data-testid={`pokemon${typesTitles[index]}Type`}
              >
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
              <td
                data-index={index}
                class="border text-center"
                data-testid={`pokemonStatValue-${stat}`}
              >
                {statsMap()?.[stat]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <A
        href={`${props.details.name}`}
        class="text-sm underline ml-auto text-slate-700"
      >
        View more
      </A>
    </div>
  )
}
