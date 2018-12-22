import {withStyles} from '@material-ui/core/styles';
import {object} from 'prop-types';
import React from 'react';
import {join} from '../utils/class-names';
import loading from './loading.css';

const styles = (theme) => ({
    container: {padding: theme.spacing.unit * 2},
    dot: {
        backgroundColor: theme.palette.secondary.main,
        margin: theme.spacing.unit
    }
});

const $Loading = props =>
    <div className={join(loading.container, props.classes.container)}>
        <div className={loading.loader}>
            <div className={join(loading.dot, props.classes.dot)}/>
            <div className={join(loading.dot, props.classes.dot)}/>
            <div className={join(loading.dot, props.classes.dot)}/>
            <div className={join(loading.dot, props.classes.dot)}/>
        </div>
    </div>;

$Loading.propTypes = {classes: object.isRequired};

export const Loading = withStyles(styles)($Loading);
