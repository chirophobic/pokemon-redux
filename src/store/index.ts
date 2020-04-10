import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { epic as pokemonsEpic, reducer as pokemonsReducer } from '../domain/pokemon/list/store';
import { epic as selectedPokemonEpic, reducer as selectedPokemonReducer } from '../domain/pokemon/details/store';

export const rootReducer = combineReducers({ pokemons: pokemonsReducer, selectedPokemon: selectedPokemonReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const rootEpic = combineEpics(pokemonsEpic, selectedPokemonEpic);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    devTools: true,
    middleware: [epicMiddleware],
    reducer: rootReducer,
});
export const store$ = new Observable<RootState>(observer => store.subscribe(() => observer.next(store.getState())));

epicMiddleware.run(rootEpic as any);
