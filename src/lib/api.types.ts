export type ApiListParams = {
  offset: number
  limit: number
}

export type ApiListResponse<T> = {
  count: number
  previous: string | null
  next: string | null
  results: T[]
}

export type PokemonListItem = {
  _id: number // custom
  name: string
  url: string
}

export type ApiUrlOptions = {
  queryParams: Record<string, string | number>
}
