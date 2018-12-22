import {withStyles} from '@material-ui/core/styles';
import {object} from 'prop-types';
import React from 'react';
import {join} from '../utils/class-names';
import loading from './loading.css';

const styles = (theme) => ({dot: {backgroundColor: theme.palette.secondary.main}});

const $Loading = props =>
    <div className={loading.container}>
        <div className={loading.loader}>
            <div className={join(loading.dot, props.classes.dot)}/>
            <div className={join(loading.dot, props.classes.dot)}/>
            <div className={join(loading.dot, props.classes.dot)}/>
            <div className={join(loading.dot, props.classes.dot)}/>
        </div>
    </div>;

$Loading.propTypes = {
    classes: object.isRequired
};

export const Loading = withStyles(styles)($Loading);
