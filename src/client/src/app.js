import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/es/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import {AddEntryButton} from './components/add-entry-button';
import {Navigation} from './components/navigation';
import {Router} from './components/router';
import {RouteContextProvider} from './providers/route-context-provider';
import {RouterProvider} from './providers/router-provider';

export const App = () =>
    <RouterProvider>
        {
            props =>
                <RouteContextProvider {...props}>
                    <AppBar position='static'>
                        <Toolbar>
                            <IconButton color='inherit' style={{visibility: 'hidden'}}>
                                <SvgIcon><span/></SvgIcon>
                            </IconButton>
                            <Typography color='inherit' variant='title'>
                                Expense Manager
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Navigation/>
                    <Router/>
                    <AddEntryButton/>
                </RouteContextProvider>
        }
    </RouterProvider>;
