import PropTypes from 'prop-types';
import React from 'react';
import Loadable from 'react-loadable';
import {Loading} from './loading';

export const LoadComponent = props => {
    const render = ({[props.name]: Content}, loadedProps) => {
        return <Content {...loadedProps}/>;
    };

    const LoadableContent = Loadable({
        loader: props.loader,
        loading: Loading,
        render
    });

    return <LoadableContent/>;
};

LoadComponent.propTypes = {
    loader: PropTypes.func.isRequired,
    name: PropTypes.string
};
LoadComponent.defaultProps = {
    name: 'default'
};
