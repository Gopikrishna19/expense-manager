const {TransactionType} = require('./transaction-type');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports.Entry = new GraphQLObjectType({
    fields() {
        return {
            _id: {type: GraphQLID},
            category: {
                description: 'Category of the entry eg: Travel, Bill etc',
                type: GraphQLString
            },
            date: {
                description: 'Date of the transaction',
                type: GraphQLInt
            },
            reason: {
                description: 'Reason for the transaction',
                type: GraphQLString
            },
            type: {
                description: 'Transaction type',
                type: TransactionType
            }
        };
    },
    name: 'Entry'
});
