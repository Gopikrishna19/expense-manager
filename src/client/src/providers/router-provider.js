import {func} from 'prop-types';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

export const RouterProvider = props =>
    <BrowserRouter>
        <Route render={props.children}/>
    </BrowserRouter>;

RouterProvider.propTypes = {
    children: func.isRequired
};
