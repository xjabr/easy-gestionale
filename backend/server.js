const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const {
	routerUsers,
	routerOrganization,
	routerCustomers
} = require('./routes');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(bodyparser.json());

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/lazweb-gestionale';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

// TODO RESTART SERVER ON ERROR?
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  // we're connected!
  console.log('CONNECTED TO DBb. SERVER RUNNING ON PORT 5000');

  app.use(cors());
  app.get('/', (_req, res) => res.send('LAZWEB api working with email!'));
  app.use('/api/users', routerUsers);
  app.use('/api/organizations', routerOrganization);
  app.use('/api/customers', routerCustomers);
});

module.exports = app;