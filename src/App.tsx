import { Component, lazy } from 'solid-js'
import { Routes, Route, Router } from '@solidjs/router'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

const PokemonListPage = lazy(() => import('./pages/PokemonListPage'))
const PokemonDetailsPage = lazy(() => import('./pages/PokemonDetailsPage'))

const queryClient = new QueryClient()

const App: Component = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" component={PokemonListPage} />
          <Route path="/:pokemonName" component={PokemonDetailsPage} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
