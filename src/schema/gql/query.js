const {GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull} = require('graphql');

const {Entry} = require('./entry');
const models = require('../models');

const entries = {
    description: 'Get all entries',
    resolve() {
        return models.Entry.find().sort({date: 1});
    },
    type: new GraphQLList(Entry)
};

const entry = {
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
    description: 'Get one entry',
    resolve(parent, args) {
        return models.Entry.findById(args.id);
    },
    type: Entry
};

module.exports.Query = new GraphQLObjectType({
    fields: {
        entries,
        entry
    },
    name: 'Query'
});

