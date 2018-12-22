import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {RouteContext} from '../providers/route-context-provider';
import {addNewEntry, entries, summary} from '../utils/path';

export const Navigation = () =>
    <RouteContext.Consumer>
        {({location}) =>
            <Tabs value={location.pathname} centered>
                <Tab component={NavLink} label='Summary' to={summary} value={summary}/>
                <Tab component={NavLink} label='Entries' to={entries} value={entries}/>
                <Tab component={NavLink} label='Add new entry' to={addNewEntry} value={addNewEntry}/>
            </Tabs>
        }
    </RouteContext.Consumer>;
