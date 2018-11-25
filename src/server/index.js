const bodyParser = require('body-parser');
const express = require('express');
const graphQL = require('express-graphql');
const path = require('path');
const mongoose = require('mongoose');
const args = require('minimist')(process.argv);

const logger = require('./logger');
const {schema} = require('../schema/gql');

const app = express();
const dbUrl = 'mongodb://Gopi:60p1@localhost/expenses';
const dist = path.resolve(__dirname, '..', 'client', 'dist');
const port = 2062;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(dist));

app.use((req, res, next) => {
    if (req.method === 'GET' || req.method === 'HEAD') {
        if (req.accepts('html')) {
            return res.sendFile('index.html', {root: dist}, err => {
                if (err) {
                    logger.error(err.message);
                    logger.warn('Got error. Forwarding to next available handler.');
                    next();
                }
            });
        }
    }
    next();
});

(async () => {
    await mongoose.connect(dbUrl, {useNewUrlParser: true})
        .then(() => {
            logger.info('Connected to database.');
        })
        .catch(err => {
            logger.error('Failed to connect to database');
            logger.error(err.message, '\n\n\n');

            throw err;
        });

    require('./index.dev')(app, args.mode);

    app.use('/api', graphQL({
        graphiql: true,
        schema
    }));

    app.listen(port, () => {
        logger.info(`Server started at http://localhost:${port}.`);
    });
})();
