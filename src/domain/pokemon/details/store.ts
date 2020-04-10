import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { concat, of } from 'rxjs';
import { getPokemonDetails, PokemonDetailsDto } from '../api';
import { RootState } from '../../../store';

const SLICE_NAME = 'pokemons/selected';

export type SelectedPokemonState = {
    error?: Error;
    isFetching: boolean;
    item: PokemonDetailsDto | null;
    receivedAt: Date;
};

const fetchPokemonDetails = createAction<number>(`${SLICE_NAME}/fetch`);

const slice = createSlice({
    initialState: {
        error: undefined,
        isFetching: true,
        item: null,
        receivedAt: new Date(0),
    } as SelectedPokemonState,
    name: SLICE_NAME,
    reducers: {
        fetchError: (state: SelectedPokemonState, action: PayloadAction<Error>) => ({
            ...state,
            error: action.payload,
            isFetching: false,
        }),
        fetchStart: (state: SelectedPokemonState) => ({ ...state, isFetching: true }),
        fetchSuccess: (state: SelectedPokemonState, action: PayloadAction<PokemonDetailsDto>) => ({
            ...state,
            error: undefined,
            isFetching: false,
            item: action.payload,
            receivedAt: new Date(),
        }),
    },
});

export const epic: Epic = (action$, state$: StateObservable<RootState>) =>
    action$.pipe(
        ofType<ReturnType<typeof fetchPokemonDetails>>(fetchPokemonDetails.type),
        switchMap(action =>
            concat(
                of(slice.actions.fetchStart()),
                getPokemonDetails(action.payload).pipe(
                    map(pokemon => slice.actions.fetchSuccess(pokemon)),
                    catchError(error => {
                        // eslint-disable-next-line no-console
                        console.error(error);
                        return of(slice.actions.fetchError(error));
                    }),
                ),
            ),
        ),
    );
export const reducer = slice.reducer;
export const actions = { fetchPokemonDetails };
