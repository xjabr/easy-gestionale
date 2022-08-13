import * as express from 'express';

import validation from '../utils/validation';
import schemes from '../types/schemes.type';
import { OrganizationsController } from '../controllers/organizations.model';
// const { authMiddleware } = require('../middleware/auth.middleware');
import errorMiddleware from '../middleware/errors.middleware';
import { ResponseExpress } from '../interfaces/index.interface';

const RouterOrganizations = {
	create: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		await validation.validateParams(schemes.organization, req.body)
		const result = await OrganizationsController.create(req.body);
		res.status(201).send(result);
	}
}

const OrganizationRoutes = express.Router();
// const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

OrganizationRoutes.post('/', errorMiddleware(RouterOrganizations.create));

export default OrganizationRoutes;
