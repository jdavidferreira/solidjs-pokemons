import {
  VoidComponent,
  createEffect,
  createSignal,
  For,
  on,
  Show,
  Switch,
  Match,
} from 'solid-js'
import { createInfiniteQuery } from '@tanstack/solid-query'

import { fetchPokemons } from 'src/lib/api'
import { PokemonListItem } from '../PokemonListItem/PokemonListItem'
import { Loader } from 'src/components/UI/Loader/Loader'

const PAGE_ITEMS = 20

export const PokemonList: VoidComponent = () => {
  const [lastItemEl, setLastItemEl] = createSignal<HTMLLIElement>()
  const query = createInfiniteQuery({
    queryKey: () => ['pokemons'],
    queryFn: ({ pageParam }) => {
      return fetchPokemons({
        offset: pageParam?.offset || 0,
        limit: PAGE_ITEMS,
      })
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) {
        // return undefined to specify that there are no more pages
        return undefined
      }

      return { offset: pages.length * PAGE_ITEMS }
    },
  })

  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries

    if (
      !entry.isIntersecting ||
      !query.isSuccess ||
      !query.hasNextPage ||
      query.isFetchingNextPage
    ) {
      return
    }

    query.fetchNextPage()
  })

  createEffect(
    on(lastItemEl, (lastItemEl, prevLastItemEl) => {
      if (prevLastItemEl) {
        observer.unobserve(prevLastItemEl)
      }

      if (lastItemEl) {
        observer.observe(lastItemEl)
      }
    })
  )

  const resultsCount = () => {
    if (!query.isSuccess) {
      return 0
    }

    return query.data.pages.reduce((count, page) => {
      return count + page.results.length
    }, 0)
  }

  return (
    <>
      <div class="sticky top-0 h-12 mb-2 p-3 flex items-center bg-white border-2 text-sm justify-between">
        <p>Current items: {resultsCount()}</p>
        <Show when={query.isSuccess && !query.hasNextPage}>
          There are no more items.
        </Show>
        <Switch>
          <Match when={query.isInitialLoading}>Loading first items...</Match>
          <Match when={query.isFetchingNextPage}>Loading more...</Match>
          <Match when={query.hasNextPage}>Can load more</Match>
          <Match when={!query.hasNextPage}>Nothing more to load</Match>
        </Switch>
      </div>
      <Show when={query.isSuccess}>
        <ul class="flex flex-col gap-2">
          <For each={query.data!.pages}>
            {(page, i) => {
              const isLastPage = () => i() === query.data!.pages.length - 1

              return (
                <For each={page.results}>
                  {(pokemon, i) => {
                    const isLastItem = () => i() === page.results.length - 1

                    return (
                      <PokemonListItem
                        {...pokemon}
                        ref={(el) => {
                          if (isLastPage() && isLastItem()) {
                            setLastItemEl(el)
                          }
                        }}
                      />
                    )
                  }}
                </For>
              )
            }}
          </For>
        </ul>
      </Show>
      <Show when={query.isLoading || query.isFetching}>
        <Loader class="mt-2" />
      </Show>
    </>
  )
}
