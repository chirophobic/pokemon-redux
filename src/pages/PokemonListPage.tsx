import * as React from "react";
import {CircularProgress, Grid} from "@material-ui/core";
import {PokemonList} from "./PokemonList";
import {Route} from "react-router";

const DetailsPage = React.lazy(() => import('./PokemonDetailsPage'));

const PokemonListPage: React.FunctionComponent = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <PokemonList />
            </Grid>
            <Route path="/pokemon/:id">
                <Grid item xs>
                    <React.Suspense fallback={<CircularProgress/>}>
                        <DetailsPage/>
                    </React.Suspense>
                </Grid>
            </Route>
        </Grid>
    );
};

export default PokemonListPage;
