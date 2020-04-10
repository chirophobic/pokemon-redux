import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { epic as pokemonsEpic, reducer as pokemonsReducer } from '../domain/pokemon/list/store';

export const rootReducer = combineReducers({ pokemons: pokemonsReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const rootEpic = combineEpics(pokemonsEpic);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    devTools: true,
    middleware: [epicMiddleware],
    reducer: rootReducer,
});
export const store$ = new Observable<RootState>(observer => store.subscribe(() => observer.next(store.getState())));

epicMiddleware.run(rootEpic as any);
