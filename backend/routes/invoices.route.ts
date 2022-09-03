import * as express from 'express';

import validation from '../utils/validation';
import schemes from '../types/schemes.type';
import { InvoicesController } from '../controllers/invoices.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import errorMiddleware from '../middleware/errors.middleware';
import { getVatCodes } from '../utils/vat-codes';
import { ResponseExpress } from '../interfaces/index.interface';

import { assertExposable } from '../modules/errors';


const RouterInvoices = {
	list: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const { type } = req.params;
		const { year } = req.query;
		
		await assertExposable(!(type !== 'invoice' && type !== 'receipt' && type !== 'credit_note'), 'invoices_type_not_valid');

		// check if limit and offset are presents
		await assertExposable(!isNaN(parseInt(req.query.limit as any)) && !isNaN(parseInt(req.query.offset as any)), 'bad_params');

		const result = await InvoicesController.list(res.organization_id, res.role === 'ADMIN' ? '*' : res.id, type, req.query, year);
		res.status(200).send(result);
	},

	getLastNr: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const { type } = req.params;
		await assertExposable(!(type !== 'invoice' && type !== 'receipt' && type !== 'credit_note'), 'invoices_type_not_valid');

		const result = await InvoicesController.getLastNr(res.organization_id, type, req.query.year ? req.query.year : new Date().getFullYear());
		res.status(200).send({ lastNr: result });
	},

	listAnagraphicByType: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const { type } = req.params;

		if (type !== 'customer' && type !== 'supplier') {
			res.status(400).send({ ok: false, msg: "Type not valid" });
			return ;
		}
		
		const result = await InvoicesController.listAnagraphicByType(res.organization_id, type);
		res.status(200).send(result);
	},

	single: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const result = await InvoicesController.single(res.organization_id, req.params.id);
		res.status(200).send(result);
	},

	create: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		await validation.validateParams(schemes.invoice, req.body)
		const result = await InvoicesController.create({ organization_id: res.organization_id, user_id: res.id, ...req.body });
		res.status(201).send(result);
	},

	update: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		await validation.validateParams(schemes.invoice, req.body)
		const result = await InvoicesController.update(req.params.id, { ...req.body }, res.organization_id);
		res.status(200).send(result);
	},

	delete: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const result = await InvoicesController.delete(req.params.id);
		res.status(200).send(result);
	},

	getVatCodesApi: async (_req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const result = await getVatCodes();
		res.status(200).send(result);
	},

	generateReport: async (req: express.Request, res: ResponseExpress, _next: express.NextFunction) => {
		const { year } = req.query;

		const result = await InvoicesController.generateReport(res.organization_id, year ? year : new Date().getFullYear());
		res.status(200).send(result);
	}
}

const InvoiceRoutes = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

InvoiceRoutes.get('/report', errorMiddleware(authed), RouterInvoices.generateReport);
InvoiceRoutes.get('/vat-codes', errorMiddleware(authed), errorMiddleware(RouterInvoices.getVatCodesApi));
InvoiceRoutes.get('/list/:type', errorMiddleware(authed), errorMiddleware(RouterInvoices.list));
InvoiceRoutes.get('/last-nr/:type', errorMiddleware(authed), errorMiddleware(RouterInvoices.getLastNr));
InvoiceRoutes.get('/list-anagraphics/:type', errorMiddleware(authed), errorMiddleware(RouterInvoices.listAnagraphicByType));
InvoiceRoutes.get('/single/:id', errorMiddleware(authed), errorMiddleware(RouterInvoices.single));
InvoiceRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterInvoices.create));
InvoiceRoutes.patch('/:id', errorMiddleware(authed), errorMiddleware(RouterInvoices.update));
InvoiceRoutes.delete('/:id', errorMiddleware(authed), errorMiddleware(RouterInvoices.delete));

export default InvoiceRoutes;