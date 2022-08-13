import * as express from 'express';
import * as rateLimit from 'express-rate-limit';
import * as Joi from 'joi';

import validation from '../utils/validation';
import { UsersController } from '../controllers/users.model';
import { OrganizationsController } from '../controllers/organizations.model';
import { authMiddleware } from '../middleware/auth.middleware';
import errorMiddleware from '../middleware/errors.middleware';
import { ResponseExpress } from '../interfaces/index.interface';


const RouterUsers = {
	login: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});

		await validation.validateParams(schema, req.body)

		const token = await UsersController.signin(req.body);
		res.send({ token });
	},

	create: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		// validate body
		const schema = Joi.object({
			organization_id: Joi.string().required(),
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			username: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			role: Joi.string().required()
		});
		await validation.validateParams(schema, req.body)

		// create account
		const result = await UsersController.create(req.body);
		res.status(201).send(result);
	},

	logout: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const schema = Joi.object({
			email: Joi.string().email().required(),
		});

		await validation.validateParams(schema, req.body)
		await UsersController.signout(req.body.email);

		res.status(200).send('OK');
	},

	getMyData: async (_req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const orgInfo = await OrganizationsController.single(res.organization_id);
		const userInfo = await UsersController.single(res.id);

		res.status(200).send({
			organization: orgInfo,
			user: userInfo
		});
	}
}

const UserRoutes = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: false, isAdmin: false });

const limitRequestsMiddleware = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 15,
	message: {
		status: 429,
		message: 'Too many requests, please try again in an hour'
	}
});

UserRoutes.get('/info', errorMiddleware(authed), errorMiddleware(RouterUsers.getMyData));
UserRoutes.post('/login', limitRequestsMiddleware, errorMiddleware(RouterUsers.login));
UserRoutes.post('/create', limitRequestsMiddleware, errorMiddleware(RouterUsers.create));
UserRoutes.post('/logout', errorMiddleware(authed), errorMiddleware(RouterUsers.logout));

export default UserRoutes;
