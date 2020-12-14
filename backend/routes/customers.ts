import * as express from 'express';

import validation from '../utils/validation';
import schemes from '../types/schemes';
import { CustomersController } from '../controllers/customers';
import { authMiddleware } from '../middleware/auth.middleware';
import errorMiddleware from '../middleware/errors.middleware';

// const Joi = require('@hapi/joi');

const RouterCustomers = {
	list: async (res: express.Response, _req: express.Request, _next: express.NextFunction) => {
		const result = await CustomersController.list();
		res.status(200).send(result);
	},

	create: async (res: express.Response, req: express.Request, _next: express.NextFunction) => {
		await validation.validateParams(schemes.customer, req.body);
		const result = await CustomersController.create(req.body);
		res.status(201).send(result);
	}
}


const CustomerRoutes: express.Router = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: true });

CustomerRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterCustomers.create));

export default CustomerRoutes;
