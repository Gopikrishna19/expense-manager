import React from 'react';
import {LoadComponent} from '../components/load-component';

export const AddEntryLoadable = () =>
    <LoadComponent
        loader={() => import('../components/add-entry')}
        name='AddEntry'
    />;
