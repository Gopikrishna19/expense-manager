const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const {Entry} = require('./entry');
const models = require('../models');

const entries = {
    description: 'Get all entries',
    resolve() {
        return models.Entry.find();
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

const initialAmount = {
    description: 'Get initial amount',
    resolve() {
        return models.InitialAmount
            .find()
            .then(results => results [0].amount);
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

