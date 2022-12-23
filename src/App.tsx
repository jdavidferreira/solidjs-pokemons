import { Component, lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'

const PokemonListPage = lazy(() => import('./pages/PokemonListPage'))
const PokemonDetailsPage = lazy(() => import('./pages/PokemonDetailsPage'))

const App: Component = () => {
  return (
    <div class="flex w-full justify-center p-4">
      <Routes>
        <Route path="/" component={PokemonListPage} />
        <Route path="/:pokemonName" component={PokemonDetailsPage} />
      </Routes>
    </div>
  )
}

export default App
