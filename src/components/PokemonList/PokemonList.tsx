import { Component, createEffect, createSignal, For, on, Show } from 'solid-js'
import { fetchPokemons } from 'src/lib/api'
import { PokemonListItem } from '../PokemonListItem/PokemonListItem'
import { Loader } from 'src/components/UI/Loader/Loader'

export const PokemonList: Component = () => {
  const [page, setPage] = createSignal(0)
  const [pokemons, setPokemons] = createSignal<Awaited<
    ReturnType<typeof fetchPokemons>
  > | null>(null)
  const [status, setStatus] = createSignal<
    'loading' | 'fetching' | 'error' | 'success'
  >('loading')
  const [lastItemEl, setLastItemEl] = createSignal<HTMLLIElement>()

  const moveToNextPage = () => setPage(page() + 1)

  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries

    if (!entry.isIntersecting) {
      return
    }

    const _pokemons = pokemons()

    if (!_pokemons) {
      return
    }

    const isLoadingOrFetching = ['loading', 'fetching'].includes(status())
    const areThereMoreItems = _pokemons.results.length < _pokemons.count

    if (!isLoadingOrFetching && areThereMoreItems) {
      moveToNextPage()
    }
  })

  createEffect(
    on(page, async (page) => {
      try {
        setStatus(pokemons() ? 'fetching' : 'loading')
        const limit = 20

        const res = await fetchPokemons({ limit, offset: page * limit })

        if (pokemons()) {
          setPokemons({
            ...res,
            results: [...(pokemons()?.results || []), ...res.results],
          })
        } else {
          setPokemons(res)
        }

        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    })
  )

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

  return (
    <>
      <Show when={pokemons()}>
        <ul class="flex flex-col gap-2">
          <For each={pokemons()!.results}>
            {(pokemon, i) => {
              const isLastItem = () => i() === pokemons()!.results.length - 1

              return (
                <PokemonListItem
                  {...pokemon}
                  ref={(el) => {
                    if (isLastItem()) {
                      setLastItemEl(el)
                    }
                  }}
                />
              )
            }}
          </For>
        </ul>
      </Show>
      <Show when={['loading', 'fetching'].includes(status())}>
        <Loader class="mt-2" />
      </Show>
    </>
  )
}
