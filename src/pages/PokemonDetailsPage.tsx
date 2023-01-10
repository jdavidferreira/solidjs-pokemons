import { useParams } from '@solidjs/router'
import { VoidComponent } from 'solid-js'

const PokemonDetailsPage: VoidComponent = () => {
  const params = useParams()

  const { pokemonName } = params

  return (
    <div class="flex w-full justify-center">Pokemon Details {pokemonName}</div>
  )
}

export default PokemonDetailsPage
