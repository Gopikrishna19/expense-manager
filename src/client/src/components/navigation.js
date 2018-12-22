import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {RouteContext} from '../providers/route-context-provider';
import {entries, summary} from '../utils/path';

const validTabs = [
    entries,
    summary
];
const getValidTab = tab => validTabs.includes(tab) ? tab : '';

export const Navigation = () =>
    <RouteContext.Consumer>
        {({location}) =>
            <Tabs value={getValidTab(location.pathname)} centered>
                <Tab component={NavLink} label='Summary' to={summary} value={summary}/>
                <Tab component={NavLink} label='Entries' to={entries} value={entries}/>
                <Tab component='span' value='' style={{display: 'none'}}/>
            </Tabs>
        }
    </RouteContext.Consumer>;
