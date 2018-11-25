import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AddEntryLoadable} from '../loadables/add-entry';
import {EntriesLoadable} from '../loadables/entries';
import {SummaryLoadable} from '../loadables/summary';

export const Router = () =>
    <>
        <Route exact path='/' render={() => <Redirect to='summary'/>}/>
        <Route path='/summary' component={SummaryLoadable}/>
        <Route path='/entries' component={EntriesLoadable}/>
        <Route path='/add-entry' component={AddEntryLoadable}/>
    </>;

Router.displayName = 'Router';
