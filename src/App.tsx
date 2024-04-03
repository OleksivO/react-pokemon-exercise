import {useState} from "react";
import {Alert, CircularProgress, Input, List, ListItem, ListItemText} from "@mui/material";
import useDebounce from "./useDebounce.tsx";
import useFetch from "./useFetch.tsx";

function App() {
    const [pokemonName, setPokemonName] = useState("ditto");
    const debouncedPokemonName = useDebounce(pokemonName, 300);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0&${new URLSearchParams({
        name: debouncedPokemonName,
    })}`;
    const { loading, error, data } = useFetch(url);

    let filteredResults = [];
    if (data && data.results) {
        filteredResults = data.results.filter((pokemon) =>
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
                        <ListItem key={index}>
                            <ListItemText primary={pokemon.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
}

export default App;
