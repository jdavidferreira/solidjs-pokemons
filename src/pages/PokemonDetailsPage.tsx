import { useParams } from '@solidjs/router'
import { VoidComponent } from 'solid-js'

const PokemonDetailsPage: VoidComponent = () => {
  const params = useParams()

  const { pokemonName } = params

  return <div>Pokemon Details {pokemonName}</div>
}

export default PokemonDetailsPage
