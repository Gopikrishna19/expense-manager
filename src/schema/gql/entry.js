const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLNonNull} = require('graphql');

const {TransactionType} = require('./transaction-type');
const {Timestamp} = require('./timestamp');

const entryFields = module.exports.entryFields = {
    amount: {
        description: 'Transaction amount',
        type: new GraphQLNonNull(GraphQLFloat)
    },
    category: {
        description: 'Category of the entry eg: Travel, Bill etc',
        type: new GraphQLNonNull(GraphQLString)
    },
    date: {
        description: 'Date of the transaction',
        type: new GraphQLNonNull(Timestamp)
    },
    reason: {
        description: 'Reason for the transaction',
        type: new GraphQLNonNull(GraphQLString)
    },
    type: {
        description: 'Transaction type',
        type: new GraphQLNonNull(TransactionType)
    }
};

module.exports.Entry = new GraphQLObjectType({
    fields() {
        return Object.assign({id: {type: GraphQLID}}, entryFields);
    },
    name: 'Entry'
});
