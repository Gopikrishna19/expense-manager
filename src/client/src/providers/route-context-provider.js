import {any, object} from 'prop-types';
import React from 'react';

export const RouteContext = React.createContext({
    history: {},
    location: {}
});

export const RouteContextProvider = props =>
    <RouteContext.Provider value={{
        history: props.history,
        location: props.location
    }}>
        {props.children}
    </RouteContext.Provider>;

RouteContextProvider.propTypes = {
    children: any.isRequired,
    history: object.isRequired,
    location: object.isRequired
};
