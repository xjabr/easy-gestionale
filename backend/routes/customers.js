const express = require('express');

const validation = require('../utils/validation');
const schemes = require('../types/schemes');
const { CustomersController } = require('../controllers/customers');
const { authMiddleware } = require('../middleware/auth.middleware');
const errorMiddleware = require('../middleware/errors.middleware');

const RouterCustomers = {
  /** @type {import("express").RequestHandler} */
	list: async (req, res, _next) => {
		const { type } = req.params;

		if (type !== 'CUSTOMER' && type !== 'SUPPLIER') {
			return res.status(400).send({ ok: false, msg: "Type not valid" });
		}

		const result = await CustomersController.list(res.organization_id, res.role === 'ADMIN' ? '*' : res.id, type);
		res.status(200).send(result);
	},

  /** @type {import("express").RequestHandler} */
	single: async (req, res, _next) => {
		const { id } = req.params;
		const result = await CustomersController.single(res.organization_id, id);
		res.status(200).send(result);
	},

  /** @type {import("express").RequestHandler} */
	create: async (req, res, _next) => {
		await validation.validateParams(schemes.customer, req.body)
		const result = await CustomersController.create({ organization_id: res.organization_id, user_id: res.id, ...req.body });
		res.status(201).send(result);
	},

	/** @type {import("express").RequestHandler} */
	update: async (req, res, _next) => {
		await validation.validateParams(schemes.customer, req.body)
		const result = await CustomersController.update(req.params.id, { ...req.body });
		res.status(200).send(result);
	},

	/** @type {import("express").RequestHandler} */
	delete: async (req, res, _next) => {
		const result = await CustomersController.delete(req.params.id);
		res.status(200).send(result);
	}
}

const CustomerRoutes = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

CustomerRoutes.get('/list/:type', errorMiddleware(authed), errorMiddleware(RouterCustomers.list));
CustomerRoutes.get('/:id', errorMiddleware(authed), errorMiddleware(RouterCustomers.single));
CustomerRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterCustomers.create));
CustomerRoutes.patch('/:id', errorMiddleware(authed), errorMiddleware(RouterCustomers.update));
CustomerRoutes.delete('/:id', errorMiddleware(authed), errorMiddleware(RouterCustomers.delete));

module.exports = CustomerRoutes;