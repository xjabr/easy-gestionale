const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const {
	routerUsers,
	routerOrganizations,
	routerAnagraphics,
	routerInvoices
} = require('./routes');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(bodyparser.json());

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

// TODO RESTART SERVER ON ERROR?
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('CONNECTED TO DB');

  app.use(cors());
  app.get('/', (_req, res) => res.send('LAZWEB api working with email!'));
  app.use('/api/users', routerUsers);
  app.use('/api/organizations', routerOrganizations);
  app.use('/api/anagraphics', routerAnagraphics);
  app.use('/api/invoices', routerInvoices);
});

module.exports = app;