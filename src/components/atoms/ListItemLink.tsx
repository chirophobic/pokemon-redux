import * as React from 'react';
import { ListItem } from '@material-ui/core';
import { Link as RouterLink, LinkProps as RouterLinkProps, useRouteMatch } from 'react-router-dom';
import { Omit } from '@material-ui/types';

export type ListItemLinkProps = {
    to: string;
    children?: React.ReactNode;
};

export const ListItemLink: React.FunctionComponent<ListItemLinkProps> = ({ children, to }) => {
    const match = useRouteMatch({
        exact: true,
        path: to,
    });

    const renderLink = React.useMemo(
        () =>
            // eslint-disable-next-line react/display-name
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <ListItem button component={renderLink} selected={match?.isExact}>
            {children}
        </ListItem>
    );
};
