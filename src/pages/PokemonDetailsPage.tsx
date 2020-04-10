import * as React from 'react';
import { useRouter } from '../routes';

const PokemonDetailsPage: React.FunctionComponent = () => {
    const router = useRouter();

    React.useEffect(() => {
        // TODO: Load pokemon details
    }, [router]);
    return <>Hello</>;
};

export default PokemonDetailsPage;
