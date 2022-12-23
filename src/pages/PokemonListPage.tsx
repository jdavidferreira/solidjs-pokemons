import { VoidComponent } from 'solid-js'
import { PokemonList } from '../components/PokemonList/PokemonList'

const PokemonListPage: VoidComponent = () => {
  return (
    <div class="lg:w-[600px]">
      <PokemonList />
    </div>
  )
}

export default PokemonListPage
