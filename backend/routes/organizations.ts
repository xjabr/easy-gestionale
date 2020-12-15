import * as express from 'express';

import validation from '../utils/validation';
import schemes from '../types/schemes';
import { OrganizationsController } from '../controllers/organizations';
// import { authMiddleware } from '../middleware/auth.middleware';
import errorMiddleware from '../middleware/errors.middleware';

const RouterOrganizations = {
	create: async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
		await validation.validateParams(schemes.organization, req.body)
		const result = await OrganizationsController.create(req.body);
		res.status(201).send(result);
	}
}

const OrganizationRoutes: express.Router = express.Router();
// const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

OrganizationRoutes.post('/', errorMiddleware(RouterOrganizations.create));

export default OrganizationRoutes;
