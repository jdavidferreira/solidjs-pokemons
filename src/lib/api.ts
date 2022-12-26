import { wait } from '../utils/general'
import {
  ApiListParams,
  ApiListResponse,
  ApiUrlOptions,
  PokemonListItem,
} from './api.types'

export const fetchPokemons: (
  params: ApiListParams
) => Promise<ApiListResponse<PokemonListItem>> = async (
  params: ApiListParams
) => {
  const url = getApiUrl('/pokemon', { queryParams: params })

  await wait(1000) // custom delay
  const result = await fetch(url)
  const json = (await result.json()) as ApiListResponse<PokemonListItem>

  json.results.forEach((item: any) => {
    item._id = Number(
      // extract the 'id' from the 'url'
      item.url.substring(item.url.search(/\/(\d)+\//) + 1, item.url.length - 1)
    )
  })

  return json
}

export const getApiUrl = (pathname: `/${string}`, options?: ApiUrlOptions) => {
  const url = new URL('https://pokeapi.co/api/v2')

  url.pathname += pathname

  if (options) {
    Object.entries(options.queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  return url.toString()
}
