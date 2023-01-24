import { VoidComponent } from 'solid-js'
import { PokemonList } from '../components/PokemonList/PokemonList'

const PokemonListPage: VoidComponent = () => {
  return (
    <div class="flex w-full h-full justify-center">
      <div class="lg:w-[600px] h-full p-4 overflow-y-auto relative">
        <PokemonList />
      </div>
    </div>
  )
}

export default PokemonListPage
