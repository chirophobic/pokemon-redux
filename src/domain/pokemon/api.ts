import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

function parseUrlToId(url: string): number {
    return parseInt(url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''), 10);
}

export type PokemonListItemDto = {
    id: number;
    name: string;
    url: string;
};

export function getPokemonsPaginated(page: number, pageSize: number): Observable<PokemonListItemDto[]> {
    return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}`).pipe(
        map((response: any): PokemonListItemDto[] =>
            response.results.map((item: any) => ({
                id: parseUrlToId(item.url),
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

export function getPokemonDetails(id: number): Observable<PokemonDetailsDto> {
    return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
        map(
            (response: any): PokemonDetailsDto => ({
                base_happiness: response.base_happiness,
                capture_rate: response.capture_rate,
                forms_switchable: response.forms_switchable,
                gender_rate: response.gender_rate,
                has_gender_differences: response.has_gender_differences,
                hatch_counter: response.hatch_counter,
                id,
                is_baby: response.is_baby,
                name: response.name,
                url: response.url,
            }),
        ),
    );
}
