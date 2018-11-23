const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLList
} = require('graphql');

const {Entry} = require('./entry');
const models = require('../models');

const entries = {
    description: 'Get all entries',
    resolve() { },
    type: new GraphQLList(Entry)
};

const entry = {
    args: {id: {type: GraphQLID}},
    description: 'Get one entry',
    resolve(parent, args) {
        models.Entry.find({id: args.id});
    },
    type: Entry
};

const initialAmount = {
    description: 'Get initial amount',
    resolve() {
        return 0;
    },
    type: GraphQLFloat
};

module.exports.Query = new GraphQLObjectType({
    fields: {
        entries,
        entry,
        initialAmount
    },
    name: 'Query'
});

