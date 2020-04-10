import * as React from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router';

export type LazyRouteProps = {
    /**
     * Callback function to perform the actual loading.
     *
     * @example
     * <LazyRoute loader={() => import('./path/to/Component')} />
     */
    loader: () => Promise<{ default: any }>;
    /**
     * The URL for the route
     */
    path: string;
};

export const useRouter = () => {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    return React.useMemo(
        () => ({
            history,
            location,
            match,
            params,
            push(path: string): void {
                history.push(path);
            },
            query: new URLSearchParams(location.search),
            replace(path: string): void {
                history.replace(path);
            },
        }),
        [params, location, history, match],
    );
};
