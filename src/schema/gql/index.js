const {GraphQLSchema} = require('graphql');

const {Query} = require('./query');
const {Mutation} = require('./mutation');

module.exports.schema = new GraphQLSchema({
    mutation: Mutation,
    query: Query
});
