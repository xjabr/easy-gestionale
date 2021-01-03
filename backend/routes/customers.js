const express = require('express');

const validation = require('../utils/validation');
const schemes = require('../types/schemes');
const { CustomersController } = require('../controllers/customers');
const { authMiddleware } = require('../middleware/auth.middleware');
const errorMiddleware = require('../middleware/errors.middleware');

const RouterCustomers = {
  /** @type {import("express").RequestHandler} */
	list: async (_req, res, _next) => {
		const result = await CustomersController.list(res.organization_id);
		res.status(200).send(result);
	},

  /** @type {import("express").RequestHandler} */
	create: async (req, res, _next) => {
		await validation.validateParams(schemes.customer, req.body)
		const result = await CustomersController.create({ organization_id: res.organization_id, ...req.body });
		res.status(201).send(result);
	}
}

const CustomerRoutes = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

CustomerRoutes.get('/', errorMiddleware(authed), errorMiddleware(RouterCustomers.list));
CustomerRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterCustomers.create));

module.exports = CustomerRoutes;