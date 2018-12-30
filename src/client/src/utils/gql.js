import {doGet, doPost} from './fetch';

const condense = string => string.replace(/\s+/g, ' ');

export const buildQuery = template => condense(`query {${template}}`);
export const buildMutation = (template, type) => condense(`mutation ($input: ${type}!) {${template}}`);

export const query = template => () =>
    doGet('/api', {query: {query: buildQuery(template)}});

export const mutation = template => (inputType, input) =>
    doPost('http://localhost:2062/api', {
        payload: {
            query: buildMutation(template, inputType),
            variables: {input}
        }
    });
