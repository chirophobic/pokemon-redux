import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import { RootState } from '../../../store';
import { actions } from './store';

export type PokemonDetailsProps = {
    id: number;
};

const PokemonDetails: React.FunctionComponent<PokemonDetailsProps> = ({ id }) => {
    const dispatch = useDispatch();
    const pokemon = useSelector((state: RootState) => state.selectedPokemon);

    React.useEffect(() => {
        dispatch(actions.fetchPokemonDetails(id));
    }, [dispatch, id]);

    if (pokemon.error) {
        return <h1>{JSON.stringify(pokemon.error.message)}</h1>;
    } else if (!pokemon.isFetching && pokemon.item) {
        return (
            <Card>
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label={`${pokemon.item.name} avatar`}
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
                            />
                        }
                        title={pokemon.item.name}
                    />
                    <CardContent>
                        <Typography color="textSecondary">Stats</Typography>
                        <Typography color="textSecondary">Abilities</Typography>
                        <Typography color="textSecondary">Locations</Typography>
                        <Typography color="textSecondary">Moves</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                            all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        );
    } else {
        return <CircularProgress />;
    }
};

export default PokemonDetails;
