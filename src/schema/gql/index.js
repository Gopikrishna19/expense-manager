const {GraphQLSchema} = require('graphql');

const {Query} = require('./query');

module.exports.schema = new GraphQLSchema({
    query: Query
});
