import { Component } from 'solid-js'

import styles from './App.module.css'
import { PokemonList } from './components/PokemonList/PokemonList'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <PokemonList />
    </div>
  )
}

export default App
