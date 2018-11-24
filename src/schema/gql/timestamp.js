const {Kind} = require('graphql/language');
const {GraphQLScalarType} = require('graphql');
const moment = require('moment');

function serialize(value) {
    if (value) {
        return moment.utc(value).valueOf();
    }
    return null;
}

function parseValue(value) {
    if (value === null) {
        return null;
    }

    try {
        return moment.utc(value).toISOString();
    } catch (err) {
        return null;
    }
}

function parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
        const num = parseInt(ast.value, 10);
        return new Date(num);
    } else if (ast.kind === Kind.STRING) {
        return parseValue(ast.value);
    }
    return null;
}

module.exports.Timestamp = new GraphQLScalarType({
    description:
        'The javascript `Date` as integer. Type represents date and time ' +
        'as number of milliseconds from start of UNIX epoch.',
    name: 'Timestamp',
    parseLiteral,
    parseValue,
    serialize
});
