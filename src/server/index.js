const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, '..', 'client', 'static')));

app.listen(2062);
