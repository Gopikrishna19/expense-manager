import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import DocumentTitle from 'react-document-title';

const getTitle = props => `Expense Manager${props.title ? ` | ${props.title}` : ''}`;

export const Page = props =>
    <DocumentTitle title={getTitle(props)}>
        <Fragment>
            <h2>{props.title}</h2>
            {props.children}
        </Fragment>
    </DocumentTitle>;

Page.displayName = 'Page';
Page.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string
};
