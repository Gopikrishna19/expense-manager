const bodyParser = require('body-parser');
const express = require('express');
const graphQL = require('express-graphql');
const path = require('path');
const mongoose = require('mongoose');

const {schema} = require('../schema/gql');

const dbUrl = 'mongodb://Gopi:60p1@localhost/expenses';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, '..', 'client', 'static')));

(async () => {
    await mongoose.connect(dbUrl, {useNewUrlParser: true});

    app.use('/api', graphQL({
        graphiql: true,
        schema
    }));

    app.listen(2062);
})();
