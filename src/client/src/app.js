import React, {Fragment} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './components/router';
import {NavigationLoadable} from './loadables/navigation';

export const App = () =>
    <BrowserRouter>
        <Fragment>
            <NavigationLoadable/>
            <Router/>
        </Fragment>
    </BrowserRouter>;
