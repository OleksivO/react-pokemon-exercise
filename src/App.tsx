import {useState} from "react";
import {Alert, CircularProgress, Input, List, ListItemButton, ListItemText} from "@mui/material";
import useDebounce from "./useDebounce.tsx";
import useFetch from "./useFetch.tsx";
import {gql, useQuery} from "@apollo/client";


const GET_POKEMONS = gql`
    query GetPokemons($name: String!) {
        pokemons: pokemon_v2_pokemon(
            order_by: { id: asc }
            where: { name: { _iregex: $name } }
        ) {
            name
            id
        }
    }
`;


function App() {
    const [pokemonName, setPokemonName] = useState("ditto");
    const debouncedPokemonName = useDebounce(pokemonName, 300);
    // const url = `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0&${new URLSearchParams({
    //     name: debouncedPokemonName,
    // })}`;s
    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: { name: debouncedPokemonName },
    });
    //const { loading, error, data } = useFetch(url);

    let filteredResults = [];
    if (data && data.pokemons) {
        filteredResults = data.pokemons.filter((pokemon) =>
            pokemon.name.includes(debouncedPokemonName.toLowerCase())
        );
    }

    return (
        <>
            <Input
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
                placeholder="Search Pokemon..."
            />
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error.message}</Alert>}
            {!loading && !error && filteredResults && (
                <List>
                    {filteredResults.map((pokemon, index) => (
                        <ListItemButton key={index}>
                            <ListItemText primary={pokemon.name} />
                        </ListItemButton>
                    ))}
                </List>
            )}
        </>
    );
}

export default App;
