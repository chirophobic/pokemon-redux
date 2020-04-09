import * as React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container
} from "@material-ui/core";
import { LazyRoute } from "./routes";

export const App: React.FunctionComponent = () => {
  return (
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
              <LazyRoute
                path="/pokemon"
                loader={() => import("./pages/PokemonListPage")}
              />
              <Redirect to="/pokemon" />
            </Switch>
          </Container>
        </main>
      </Router>
    </>
  );
};
