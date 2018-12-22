import Fab from '@material-ui/core/Fab';
import {withStyles} from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import {object} from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {addNewEntry} from '../utils/path';

const styles = theme => ({
    positionBottomRight: {
        bottom: theme.spacing.unit * 3,
        position: 'fixed',
        right: theme.spacing.unit * 3
    }
});

const _AddEntryButton = props =>
    <Fab component={NavLink} to={addNewEntry} color='primary' className={props.classes.positionBottomRight}>
        <Add/>
    </Fab>;

_AddEntryButton.propTypes = {classes: object.isRequired};

export const AddEntryButton = withStyles(styles)(_AddEntryButton);
