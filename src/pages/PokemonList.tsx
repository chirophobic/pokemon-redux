import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, CircularProgress, List, ListItemAvatar, ListItemText, ListSubheader, Paper } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { pokemonsSlice } from '../store/pokemon';
import { RootState } from '../store';
import { ListItemLink } from '../components/atoms/ListItemLink';

export const PokemonList: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector((state: RootState) => state.pokemons);

    React.useEffect(() => {
        dispatch(pokemonsSlice.actions.fetchRequest());
    }, [dispatch]);

    if (pokemons.isFetching) {
        return <CircularProgress />;
    } else if (pokemons.error) {
        return <h1>{JSON.stringify(pokemons.error.message)}</h1>;
    } else {
        return (
            <Paper>
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Pokemon
                        </ListSubheader>
                    }
                >
                    {pokemons.items.map((pokemon, index) => (
                        <ListItemLink to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={pokemon.name} secondary={`Pokemon #${pokemon.id}`} />
                        </ListItemLink>
                    ))}
                </List>
            </Paper>
        );
    }
};
