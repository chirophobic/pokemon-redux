import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { concat, of } from 'rxjs';
import { getPokemonsPaginated, PokemonListItemDto } from '../api';
import { RootState } from '../../../store';

const STORE_NAME = 'pokemons';
const CACHE_TIME_MILLISECONDS = 30 * 1000;

const shouldRefetch = (state: PokemonsState): boolean => {
    const now = Date.now();
    const lastFetch = state.receivedAt.getTime();
    return now - lastFetch > CACHE_TIME_MILLISECONDS;
};

export type PokemonsState = {
    isFetching: boolean;
    error?: Error;
    receivedAt: Date;
    items: PokemonListItemDto[];
};

export const slice = createSlice({
    initialState: {
        error: undefined,
        isFetching: true,
        items: [],
        receivedAt: new Date(0),
    } as PokemonsState,
    name: STORE_NAME,
    reducers: {
        fetchError: (state: PokemonsState, action: PayloadAction<Error>) => ({
            ...state,
            error: action.payload,
            isFetching: false,
        }),
        fetchStart: (state: PokemonsState) => ({ ...state, isFetching: true }),
        fetchSuccess: (state: PokemonsState, action: PayloadAction<PokemonListItemDto[]>) => ({
            ...state,
            error: undefined,
            isFetching: false,
            items: action.payload,
            receivedAt: new Date(),
        }),
    },
});

const fetchPokemons = createAction(`${STORE_NAME}/fetch`);

export const epic: Epic = (action$, state$: StateObservable<RootState>) =>
    action$.pipe(
        ofType<typeof fetchPokemons>(fetchPokemons.type),
        filter(() => shouldRefetch(state$.value.pokemons)),
        switchMap(() =>
            concat(
                of(slice.actions.fetchStart()),
                getPokemonsPaginated(100, 1).pipe(
                    map(pokemons => slice.actions.fetchSuccess(pokemons)),
                    catchError(error => of(slice.actions.fetchError(error))),
                ),
            ),
        ),
    );

export const reducer = slice.reducer;
export const actions = { fetchPokemons };
