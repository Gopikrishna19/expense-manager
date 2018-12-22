import React from 'react';
import {Navigation} from './components/navigation';
import {Router} from './components/router';
import {RouteContextProvider} from './providers/route-context-provider';
import {RouterProvider} from './providers/router-provider';

export const App = () =>
    <RouterProvider>
        {
            props =>
                <RouteContextProvider {...props}>
                    <Navigation/>
                    <Router/>
                </RouteContextProvider>
        }
    </RouterProvider>;
