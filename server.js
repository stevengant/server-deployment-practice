'use strict';

const express = require('express');
const logger = require('./middleware/logger');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');
const PORT = process.env.PORT || 3001;

// creates an express singleton
const app = express();

app.get('/', logger, (req, res, next) => {

  res.status(200).send(req.log);
});

app.get('/bad', (req, res, next) => {
  next('Houston, we have a problem');
})


app.use('*', notFound);
app.use(errorHandler);

const start = () => {
app.listen(PORT, () => console.log('server running'));
};

module.exports = { start, app };
