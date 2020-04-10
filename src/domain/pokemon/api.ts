import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export type PokemonListItemDto = {
    id: number;
    name: string;
    url: string;
};

export function getPokemonsPaginated(page: number, pageSize: number): Observable<PokemonListItemDto[]> {
    return ajax.getJSON('https://pokeapi.co/api/v2/pokemon/').pipe(
        map((response: any): PokemonListItemDto[] =>
            response.results.map((item: any) => ({
                id: parseInt(item.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''), 10),
                name: item.name,
                url: item.url,
            })),
        ),
        catchError(error => of(error)),
    );
}

export type PokemonDetailsDto = PokemonListItemDto & {
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
};

export async function getPokemonDetails(id: number): Promise<PokemonDetailsDto> {
    return Promise.reject(new Error('Not implemented'));
}
