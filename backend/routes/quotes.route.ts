import * as express from 'express';

import validation from '../utils/validation';
import schemes from '../types/schemes.type';
import { QuotesController } from '../controllers/quotes.model';
import { authMiddleware } from '../middleware/auth.middleware';
import errorMiddleware from '../middleware/errors.middleware';
import { getVatCodes } from '../utils/vat-codes';
import { ResponseExpress } from '../interfaces/index.interface';
import { assertExposable } from '../modules/errors';

const RouterQuotes = {
	list: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		// check if limit and offset are presents
		await assertExposable(!isNaN(parseInt(req.query.limit as any)) && !isNaN(parseInt(req.query.offset as any)), 'bad_params');

		const result = await QuotesController.list(res.organization_id, res.role === 'ADMIN' ? '*' : res.id, req.query);
		res.status(200).send(result);
	},

	getLastNr: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const result = await QuotesController.getLastNr(res.organization_id, req.query.year ? req.query.year : new Date().getFullYear());
		res.status(200).send({ lastNr: result });
	},

	listAnagraphicByType: async (_req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const result = await QuotesController.listAnagraphicByType(res.organization_id);
		res.status(200).send(result);
	},

	single: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const result = await QuotesController.single(res.organization_id, req.params.id);
		res.status(200).send(result);
	},

	create: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		await validation.validateParams(schemes.quote, req.body)
		const result = await QuotesController.create({ organization_id: res.organization_id, user_id: res.id, ...req.body });
		res.status(201).send(result);
	},

	update: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		await validation.validateParams(schemes.quote, req.body)
		const result = await QuotesController.update(req.params.id, { ...req.body });
		res.status(200).send(result);
	},

	delete: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const result = await QuotesController.delete(req.params.id);
		res.status(200).send(result);
	},

	getVatCodesApi: async (_req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const result = await getVatCodes();
		res.status(200).send(result);
	},

	analysisQuoteCustomer: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const { year } = req.query;

		const result = await QuotesController.analysisQuoteCustomer(res.organization_id, year ? year : new Date().getFullYear());
		res.status(200).send(result);
	}
}

const QuoteRoutes = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

QuoteRoutes.get('/analysis-customer-quotes', errorMiddleware(authed), RouterQuotes.analysisQuoteCustomer);
QuoteRoutes.get('/vat-codes', errorMiddleware(authed), errorMiddleware(RouterQuotes.getVatCodesApi));
QuoteRoutes.get('/list', errorMiddleware(authed), errorMiddleware(RouterQuotes.list));
QuoteRoutes.get('/last-nr', errorMiddleware(authed), errorMiddleware(RouterQuotes.getLastNr));
QuoteRoutes.get('/list-anagraphics', errorMiddleware(authed), errorMiddleware(RouterQuotes.listAnagraphicByType));
QuoteRoutes.get('/single/:id', errorMiddleware(authed), errorMiddleware(RouterQuotes.single));
QuoteRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterQuotes.create));
QuoteRoutes.patch('/:id', errorMiddleware(authed), errorMiddleware(RouterQuotes.update));
QuoteRoutes.delete('/:id', errorMiddleware(authed), errorMiddleware(RouterQuotes.delete));

export default QuoteRoutes;