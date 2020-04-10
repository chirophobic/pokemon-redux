import { createSlice } from '@reduxjs/toolkit';

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
