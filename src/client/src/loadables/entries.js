import React from 'react';
import {LoadComponent} from '../components/load-component';

export const EntriesLoadable = () =>
    <LoadComponent
        loader={() => import('../components/entries')}
        name='Entries'
    />;
