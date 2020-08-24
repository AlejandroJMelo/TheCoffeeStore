const express = require('express');
const app = express();

app.use(require('./home'));
app.use(require('./user'));
app.use(require('./login'));

module.exports = app;