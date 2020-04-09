import * as React from 'react';
import {useRouter} from "../routes";

const PokemonDetailsPage: React.FunctionComponent = () => {
    const router = useRouter();

    React.useEffect(() => {

    }, [router]);
    return <>Hello</>;
};

export default PokemonDetailsPage;
