import { VoidComponent } from 'solid-js'
import { PokemonList } from '../components/PokemonList/PokemonList'

const PokemonListPage: VoidComponent = () => {
  return (
    <div class="flex w-full justify-center">
      <div class="lg:w-[600px] p-4">
        <PokemonList />
      </div>
    </div>
  )
}

export default PokemonListPage
