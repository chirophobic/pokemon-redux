import * as React from 'react';

export type PokemonDetailsProps = {
    id: number;
};

const PokemonDetails: React.FunctionComponent<PokemonDetailsProps> = ({ id }) => {
    React.useEffect(() => {
        // eslint-disable-next-line no-console
        console.log({ id });
    }, [id]);
    return <p>Hello</p>;
};

export default PokemonDetails;
