const {
    GraphQLEnumType
} = require('graphql');

module.exports.TransactionType = new GraphQLEnumType({
    name: 'TransactionType',
    values: {
        credit: {
            description: 'A credit transaction',
            value: 'credit'
        },
        debit: {
            description: 'A debit transaction',
            value: 'debit'
        }
    }
});
