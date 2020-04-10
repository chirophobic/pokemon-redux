import * as React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { Route } from 'react-router';
import { PokemonList } from './PokemonList';

const DetailsPage = React.lazy(() => import('./PokemonDetailsPage'));

const PokemonListPage: React.FunctionComponent = () => (
    <Grid container spacing={2}>
        <Grid item xs={3}>
            <PokemonList />
        </Grid>
        <Route path="/pokemon/:id">
            <Grid item xs>
                <React.Suspense fallback={<CircularProgress />}>
                    <DetailsPage />
                </React.Suspense>
            </Grid>
        </Route>
    </Grid>
);

export default PokemonListPage;
