import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from 'morgan';

import {
	routerUsers,
	routerOrganizations,
	routerAnagraphics,
	routerInvoices
} from './routes';

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
  app.get('/', (_req, res) => res.send('API working correctly'));
  app.use('/api/users', routerUsers);
  app.use('/api/organizations', routerOrganizations);
  app.use('/api/anagraphics', routerAnagraphics);
  app.use('/api/invoices', routerInvoices);
});

export default app;