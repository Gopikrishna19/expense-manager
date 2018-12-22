const {GraphQLObjectType} = require('graphql');

const {Entry, entryFields} = require('./entry');
const models = require('../models');

const addEntry = {
    args: entryFields,
    resolve(parent, args) {
        return new models.Entry(args).save();
    },
    type: Entry
};

module.exports.Mutation = new GraphQLObjectType({
    fields: {addEntry},
    name: 'Mutation'
});
