const doFetch = async (url, options) => {
    const fetchOptions = Object.assign(options, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const response = await fetch(url, fetchOptions);
    const {data, errors} = await response.json();

    if (response.ok) {
        return data;
    } else {
        throw errors;
    }
};

const buildQueryParams = (params = {}) => Object.entries(params)
    .filter(([, value]) => value)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
    .replace(/^/, '?');

export const doGet = (url, options) => doFetch(
    `${url}${buildQueryParams(options.query)}`,
    {method: 'GET'}
);

export const doPost = (url, options) => doFetch(
    `${url}${buildQueryParams(options.query)}`,
    {
        body: JSON.stringify(options.payload),
        method: 'POST'
    }
);
