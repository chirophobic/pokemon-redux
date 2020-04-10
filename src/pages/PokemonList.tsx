import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, List, ListItem, ListItemText } from '@material-ui/core';
import { pokemonsSlice } from '../store/pokemon';
import { RootState } from '../store';
import { useRouter } from '../routes';

export const PokemonList: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector((state: RootState) => state.pokemons);
    const router = useRouter();

    React.useEffect(() => {
        dispatch(pokemonsSlice.actions.fetchRequest());
    }, [dispatch]);

    if (pokemons.isFetching) {
        return <CircularProgress />;
    } else if (pokemons.error) {
        return <h1>{JSON.stringify(pokemons.error.message)}</h1>;
    } else {
        return (
            <List component="nav">
                {pokemons.items.map((pokemon, index) => (
                    <ListItem button onClick={() => router.push(`/pokemon/${pokemon.id}`)} key={index}>
                        <ListItemText primary={pokemon.name} />
                    </ListItem>
                ))}
            </List>
        );
    }
};
