const express = require('express');

const validation = require('../utils/validation');
const schemes = require('../types/schemes');
const { OrganizationsController } = require('../controllers/organizations');
// const { authMiddleware } = require('../middleware/auth.middleware');
const errorMiddleware = require('../middleware/errors.middleware');

const RouterOrganizations = {
  /** @type {import("express").RequestHandler} */
	create: async (req, res, _next) => {
		await validation.validateParams(schemes.organization, req.body)
		const result = await OrganizationsController.create(req.body);
		res.status(201).send(result);
	}
}

const OrganizationRoutes = express.Router();
// const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

OrganizationRoutes.post('/', errorMiddleware(RouterOrganizations.create));

module.exports = OrganizationRoutes;
