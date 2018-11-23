const bodyParser = require('body-parser');
const express = require('express');
const graphQL = require('express-graphql');
const path = require('path');

const {schema} = require('../schema/gql');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, '..', 'client', 'static')));

app.use('/api', graphQL({
    graphiql: true,
    schema
}));

app.listen(2062);
