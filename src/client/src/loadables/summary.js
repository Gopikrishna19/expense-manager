import React from 'react';
import {LoadComponent} from '../components/load-component';

export const SummaryLoadable = () =>
    <LoadComponent
        loader={() => import('../components/summary')}
        name='Summary'
    />;

SummaryLoadable.displayName = 'SummaryLoadable';
