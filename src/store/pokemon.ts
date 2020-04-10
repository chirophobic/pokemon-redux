import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

const CACHE_TIME_MILLISECONDS = 30 * 1000;

const shouldRefetch = (state: PokemonsState): boolean => {
    const now = Date.now();
    const lastFetch = state.receivedAt.getTime();
    return !state.isFetching && now - lastFetch > CACHE_TIME_MILLISECONDS;
};

export type Pokemon = {
    url: string;
    name: string;
    id: number;
};

export type PokemonsState = {
    isFetching: boolean;
    error?: Error;
    receivedAt: Date;
    items: Pokemon[];
};

export const pokemonsSlice = createSlice({
    initialState: {
        error: undefined,
        isFetching: true,
        items: [],
        receivedAt: new Date(0),
    } as PokemonsState,
    name: 'pokemons',
    reducers: {
        fetchError: (state: PokemonsState, action: PayloadAction<Error>) => ({
            ...state,
            error: action.payload,
            isFetching: false,
        }),
        fetchRequest: (state: PokemonsState) => shouldRefetch(state) ? { ...state, isFetching: true } : state,
        fetchSuccess: (state: PokemonsState, action: PayloadAction<Pokemon[]>) => ({
            ...state,
            error: undefined,
            isFetching: false,
            items: action.payload,
            receivedAt: new Date(),
        }),
    },
});

export const pokemonsEpic: Epic = action$ =>
    action$.pipe(
        ofType<typeof pokemonsSlice.actions.fetchRequest>(pokemonsSlice.actions.fetchRequest.type),
        switchMap(() =>
            ajax.getJSON('https://pokeapi.co/api/v2/pokemon/').pipe(
                map((response: any): Pokemon[] =>
                    response.results.map((item: any) => ({
                        id: parseInt(item.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''), 10),
                        name: item.name,
                        url: item.url,
                    })),
                ),
                map(pokemons => pokemonsSlice.actions.fetchSuccess(pokemons)),
                catchError(error => of(error)),
            ),
        ),
    );

export type SelectedPokemon = {};

export type SelectedPokemonState = {
    error?: Error;
    isFetching: boolean;
    item: SelectedPokemon | null;
    receivedAt: Date;
};

export const selectedPokemonSlice = createSlice({
    initialState: {
        error: undefined,
        isFetching: true,
        item: null,
        receivedAt: new Date(0),
    } as SelectedPokemon,
    name: 'pokemons/selected',
    reducers: {},
});
