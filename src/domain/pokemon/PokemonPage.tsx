import * as React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { Route, useParams } from 'react-router';
import { PokemonList } from './list/PokemonList';

const PokemonDetails = React.lazy(async () => import('./details/PokemonDetails'));

const PokemonPage: React.FunctionComponent = () => (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <PokemonList />
            </Grid>
            <Route path="/pokemon/:id">
                <LazyPokemonDetails />
            </Route>
        </Grid>
    );

const LazyPokemonDetails: React.FunctionComponent = () => {
    const { id } = useParams();
    const pokemonId = id ? parseInt(id, 10) : NaN;

    return (
        <Grid item xs>
            {isNaN(pokemonId) && <CircularProgress />}
            {!isNaN(pokemonId) && (
                <React.Suspense fallback={<CircularProgress />}>
                    <PokemonDetails id={pokemonId} />
                </React.Suspense>
            )}
        </Grid>
    );
};

export default PokemonPage;
