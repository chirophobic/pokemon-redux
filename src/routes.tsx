import * as React from "react";
import {
    Route,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch
} from "react-router";
import {CircularProgress} from "@material-ui/core";

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

export const LazyRoute: React.FunctionComponent<LazyRouteProps> = ({
                                                                       loader,
                                                                       path
                                                                   }) => (
    <React.Suspense fallback={<CircularProgress/>}>
        <Route path={path} component={React.lazy(() => loader())}/>
    </React.Suspense>
);
LazyRoute.displayName = "LazyRoute";

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
            }
        }),
        [params, location, history, match]
    );
};
