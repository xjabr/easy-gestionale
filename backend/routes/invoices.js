const express = require('express');

const validation = require('../utils/validation');
const schemes = require('../types/schemes');
const { InvoicesController } = require('../controllers/invoices');
const { authMiddleware } = require('../middleware/auth.middleware');
const errorMiddleware = require('../middleware/errors.middleware');

const RouterInvoices = {
  /** @type {import("express").RequestHandler} */
	list: async (req, res, _next) => {
		const { type } = req.params;

		if (type !== 'CLIENTE' && type !== 'FORNITORE' && type !== 'NOTA CREDITO') {
			return res.status(400).send({ ok: false, msg: "Type not valid" });
		}

		const result = await InvoicesController.list(res.organization_id, res.role === 'ADMIN' ? '*' : res.id, type);
		res.status(200).send(result);
	},

  /** @type {import("express").RequestHandler} */
	single: async (req, res, _next) => {
		const result = await InvoicesController.single(res.organization_id, req.params.id);
		res.status(200).send(result);
	},

  /** @type {import("express").RequestHandler} */
	create: async (req, res, _next) => {
		await validation.validateParams(schemes.invoice, req.body)
		const result = await InvoicesController.create({ organization_id: res.organization_id, user_id: res.id, ...req.body });
		res.status(201).send(result);
	},

	/** @type {import("express").RequestHandler} */
	update: async (req, res, _next) => {
		await validation.validateParams(schemes.invoice, req.body)
		const result = await InvoicesController.update(req.params.id, { ...req.body });
		res.status(200).send(result);
	},

	/** @type {import("express").RequestHandler} */
	delete: async (req, res, _next) => {
		const result = await InvoicesController.delete(req.params.id);
		res.status(200).send(result);
	}
}

const InvoiceRoutes = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

InvoiceRoutes.get('/list/:type', errorMiddleware(authed), errorMiddleware(RouterInvoices.list));
InvoiceRoutes.get('/:id', errorMiddleware(authed), errorMiddleware(RouterInvoices.single));
InvoiceRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterInvoices.create));
InvoiceRoutes.patch('/:id', errorMiddleware(authed), errorMiddleware(RouterInvoices.update));
InvoiceRoutes.delete('/:id', errorMiddleware(authed), errorMiddleware(RouterInvoices.delete));

module.exports = InvoiceRoutes;