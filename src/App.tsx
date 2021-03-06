import * as React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { AppBar, CircularProgress, Container, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { Route } from 'react-router';

const PokemonPage = React.lazy(async () => import('./domain/pokemon/PokemonPage'));

export const App: React.FunctionComponent = () => (
    <>
        <CssBaseline />
        <Router>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6">Testing</Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Container>
                    <Switch>
                        <Route path="/pokemon">
                            <React.Suspense fallback={<CircularProgress />}>
                                <PokemonPage />
                            </React.Suspense>
                        </Route>
                        <Redirect to="/pokemon" />
                    </Switch>
                </Container>
            </main>
        </Router>
    </>
);
