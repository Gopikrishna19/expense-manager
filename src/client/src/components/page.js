import {any, string} from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';

const getTitle = props => `Expense Manager${props.title ? ` | ${props.title}` : ''}`;

export const Page = props =>
    <DocumentTitle title={getTitle(props)}>
        <>
            {props.children}
        </>
    </DocumentTitle>;

Page.propTypes = {
    children: any,
    title: string
};
