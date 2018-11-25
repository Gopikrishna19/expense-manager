import React from 'react';
import {LoadComponent} from '../components/load-component';

export const NavigationLoadable = () =>
    <LoadComponent
        loader={() => import('../components/navigation')}
        name='Navigation'
    />;

NavigationLoadable.displayName = 'NavigationLoadable';
