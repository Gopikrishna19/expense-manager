import PropTypes from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';

const getTitle = props => `Expense Manager${props.title ? ` | ${props.title}` : ''}`;

export const Page = props =>
    <DocumentTitle title={getTitle(props)}>
        <>
            <h2>{props.title}</h2>
            {props.children}
        </>
    </DocumentTitle>;

Page.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string
};
