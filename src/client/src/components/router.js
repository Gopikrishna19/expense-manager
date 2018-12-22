import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {object} from 'prop-types';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AddEntryLoadable} from '../loadables/add-entry';
import {EntriesLoadable} from '../loadables/entries';
import {SummaryLoadable} from '../loadables/summary';

const styles = theme => ({routeContainer: {padding: theme.spacing.unit * 3}});

const _Router = props =>
    <>
        <Route exact path='/' render={() => <Redirect to='summary'/>}/>
        <Typography component='div' className={props.classes.routeContainer}>
            <Route path='/summary' component={SummaryLoadable}/>
            <Route path='/entries' component={EntriesLoadable}/>
            <Route path='/add-entry' component={AddEntryLoadable}/>
        </Typography>
    </>;

_Router.propTypes = {classes: object.isRequired};

export const Router = withStyles(styles)(_Router);
