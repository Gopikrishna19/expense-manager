const doFetch = async query => {
    const response = await fetch(`/api?query=${encodeURIComponent(query.replace(/\s*/, ' '))}`);
    const {data} = await response.json();

    return data;
};

export const query = template =>  doFetch(`query {${template}}`);
export const mutation = template => doFetch(`mutation {${template}}`);
