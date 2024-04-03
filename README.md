# Pokemon Data Fetching

This project involves fetching Pokemon data from the PokeAPI.

### Challenges

1. Fetch data is not updated when the input value changes.
2. The fetch is not debounced, so it will make a request for every input change.
3. The fetch is not memoized, so it will make a request for the same Pokemon multiple times.
4. The fetch is not cancelled when the component is unmounted.
5. The fetch is not error handled.
6. The fetch is not loading handled.
7. The fetch is not success handled.
8. The fetch is not refactored to a custom hook.

### JS Part

1. Create debounce function.
2. Create memoize function (Optional).
3. Create cancelable promise function (Optional).

### Material UI Part

1. Use Material UI spinner when loading.
2. Use Material UI alert when error.
3. Use Material UI list when success.

### Extra

1. Refactor code with usage of GraphQL and Apollo Client.

```javascript
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
});
```

Pass a dynamic variable to the query and use it to filter the Pokemon list instead of …

```query GetPokemon() {
gen3_species: pokemon_v2_pokemonspecies(order_by: {id: asc}, where: {pokemon_v2_pokemons: {name: {_iregex: ...}}}) {
        name
        id
    }
}
```
