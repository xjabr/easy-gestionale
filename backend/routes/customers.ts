import * as express from 'express';

import validation from '../utils/validation';
import schemes from '../types/schemes';
import { CustomersController } from '../controllers/customers';
import { authMiddleware } from '../middleware/auth.middleware';
import errorMiddleware from '../middleware/errors.middleware';

const RouterCustomers = {
	list: async (_req: express.Request, res: express.Response | any, _next: express.NextFunction) => {
		const result = await CustomersController.list(res.organization_id);
		res.status(200).send(result);
	},

	create: async (req: express.Request, res: express.Response | any, _next: express.NextFunction) => {
		await validation.validateParams(schemes.customer, req.body)
		const result = await CustomersController.create({ organization_id: res.organization_id, ...req.body });
		res.status(201).send(result);
	}
}

const CustomerRoutes: express.Router = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

CustomerRoutes.get('/', errorMiddleware(authed), errorMiddleware(RouterCustomers.list));
CustomerRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterCustomers.create));

export default CustomerRoutes;

// const Joi = require('@hapi/joi');

// const RouterCustomers = {
// 	list: async (res: express.Response | any, _req: express.Request, _next: express.NextFunction) => {
// 		const result = await CustomersController.list(res.organization_id);
// 		res.status(200).send(result);
// 	},

// 	create: async (res: express.Response | any, req: express.Request, _next: express.NextFunction) => {
// 		await validation.validateParams(schemes.customer, req.body);
// 		const result = await CustomersController.create({ organization_id: res.organization_id, ...req.body });
// 		res.status(201).send(result);
// 	}
// }


// const CustomerRoutes: express.Router = express.Router();
// const authed = authMiddleware.authAssert({ isActive: true, isVerified: true });

// CustomerRoutes.get('/', errorMiddleware(authed), errorMiddleware(RouterCustomers.list));
// CustomerRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterCustomers.create));

// export default CustomerRoutes;
