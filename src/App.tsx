import * as React from 'react';
import { Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { LazyRoute } from './routes';

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
                        <LazyRoute path="/pokemon" loader={() => import('./pages/PokemonListPage')} />
                        <Redirect to="/pokemon" />
                    </Switch>
                </Container>
            </main>
        </Router>
    </>
);
