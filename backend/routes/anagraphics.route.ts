import * as express from 'express';

import validation from '../utils/validation';
import schemes from '../types/schemes.type';
import { AnagraphicsController } from '../controllers/anagraphics.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import errorMiddleware from '../middleware/errors.middleware';
import { ResponseExpress } from '../interfaces/index.interface';
import { assertExposable } from '../modules/errors';

const RouterAnagraphics = {
	list: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const { type } = req.params;

		if (type !== 'customer' && type !== 'supplier') {
			res.status(400).send({ ok: false, msg: "Type not valid" });
			return ;
		}

		// check if limit and offset are presents
		await assertExposable(!isNaN(parseInt(req.query.limit as any)) && !isNaN(parseInt(req.query.offset as any)), 'bad_params');

		const result = await AnagraphicsController.list(res.organization_id, res.role === 'ADMIN' ? '*' : res.id, type, req.query);
		res.status(200).send(result);
	},

	single: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const { id } = req.params;
		
		const result = await AnagraphicsController.single(res.organization_id, id);
		await assertExposable(result, 'not_found');

		res.status(200).send(result);
	},

	create: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		await validation.validateParams(schemes.anagraphic, req.body)
		const result = await AnagraphicsController.create({ organization_id: res.organization_id as any, user_id: res.id as any, ...req.body });
		res.status(201).send(result);
	},

	update: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		await validation.validateParams(schemes.anagraphic, req.body)
		const result = await AnagraphicsController.update(req.params.id, { ...req.body });
		res.status(200).send(result);
	},

	delete: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const result = await AnagraphicsController.delete(req.params.id);
		res.status(200).send(result);
	}
}

const AnagraphicRoutes = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

AnagraphicRoutes.get('/list/:type', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.list));
AnagraphicRoutes.get('/single/:id', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.single));
AnagraphicRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.create));
AnagraphicRoutes.patch('/:id', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.update));
AnagraphicRoutes.delete('/:id', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.delete));

export default AnagraphicRoutes;