const {GraphQLInputObjectType, GraphQLObjectType} = require('graphql');

const {Entry, entryFields} = require('./entry');
const models = require('../models');

const addEntry = {
    args: {
        entry: {
            description: 'Entry to add',
            type: new GraphQLInputObjectType({
                fields: entryFields,
                name: 'EntryToAdd'
            })
        }
    },
    resolve(parent, {entry}) {
        return new models.Entry(entry).save();
    },
    type: Entry
};

module.exports.Mutation = new GraphQLObjectType({
    fields: {addEntry},
    name: 'Mutation'
});
