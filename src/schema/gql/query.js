const {GraphQLObjectType, GraphQLID, GraphQLNonNull} = require('graphql');

const {Entry, EntryList} = require('./entry');
const models = require('../models');

const entries = {
    description: 'Get all entries',
    resolve() {
        return models.Entry.find().sort({date: 1});
    },
    type: EntryList
};

const entry = {
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
    description: 'Get one entry',
    resolve(parent, args) {
        return models.Entry.findById(args.id);
    },
    type: Entry
};

const debits = {
    description: 'Get all debit records',
    resolve() {
        return models.Entry.find({type: {$eq: 'debit'}});
    },
    type: EntryList
};

const credits = {
    description: 'Get all credit records',
    resolve() {
        return models.Entry.find({type: {$eq: 'credit'}});
    },
    type: EntryList
};

module.exports.Query = new GraphQLObjectType({
    fields: {
        credits,
        debits,
        entries,
        entry
    },
    name: 'Query'
});

