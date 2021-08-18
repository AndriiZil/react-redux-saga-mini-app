import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './pages/App';
import Details from './pages/Details';

export const MAIN_ROUTE = 'main';
export const PEOPLE_DETAILS_ROUTE = 'peopleDetails';

const routes = [
    {
        id: 'main',
        path: '/',
        exact: true,
        component: App
    },
    {
        id: 'peopleDetails',
        path: '/people/:id',
        exact: true,
        component: Details
    },
];

export const getRouteConfig = id => {
    const route = routes.find(r => r.id === id);

    if (route) {
        const { component, ...rest } = route;
        return rest;
    }
}

export default function Routes() {
    return (
        <Switch>
            { routes.map(r => {
                const { id, ...props } = r;

                return (
                    <Route
                        key={id}
                        exact={props.exact}
                        component={props.component}
                        path={props.path}
                    />
                );
            })}
        </Switch>
    )
};
