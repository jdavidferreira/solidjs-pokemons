import { Component } from 'solid-js'

import { PokemonList } from './components/PokemonList/PokemonList'

const App: Component = () => {
  return (
    <div class="flex w-full justify-center">
      <div class="xl:w-[600px] p-4">
        <PokemonList />
      </div>
    </div>
  )
}

export default App
