const express = require('express');

const validation = require('../utils/validation');
const schemes = require('../types/schemes');
const { AnagraphicsController } = require('../controllers/anagraphics');
const { authMiddleware } = require('../middleware/auth.middleware');
const errorMiddleware = require('../middleware/errors.middleware');

const RouterAnagraphics = {
  /** @type {import("express").RequestHandler} */
	list: async (req, res, _next) => {
		const { type } = req.params;

		if (type !== 'CUSTOMER' && type !== 'SUPPLIER') {
			return res.status(400).send({ ok: false, msg: "Type not valid" });
		}

		const result = await AnagraphicsController.list(res.organization_id, res.role === 'ADMIN' ? '*' : res.id, type, req.query);
		res.status(200).send(result);
	},

  /** @type {import("express").RequestHandler} */
	single: async (req, res, _next) => {
		const { id } = req.params;
		const result = await AnagraphicsController.single(res.organization_id, id);
		res.status(200).send(result);
	},

  /** @type {import("express").RequestHandler} */
	create: async (req, res, _next) => {
		await validation.validateParams(schemes.anagraphic, req.body)
		const result = await AnagraphicsController.create({ organization_id: res.organization_id, user_id: res.id, ...req.body });
		res.status(201).send(result);
	},

	/** @type {import("express").RequestHandler} */
	update: async (req, res, _next) => {
		await validation.validateParams(schemes.anagraphic, req.body)
		const result = await AnagraphicsController.update(req.params.id, { ...req.body });
		res.status(200).send(result);
	},

	/** @type {import("express").RequestHandler} */
	delete: async (req, res, _next) => {
		const result = await AnagraphicsController.delete(req.params.id);
		res.status(200).send(result);
	}
}

const AnagraphicRoutes = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: true, isAdmin: false });

AnagraphicRoutes.get('/list/:type', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.list));
AnagraphicRoutes.get('/:id', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.single));
AnagraphicRoutes.post('/', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.create));
AnagraphicRoutes.patch('/:id', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.update));
AnagraphicRoutes.delete('/:id', errorMiddleware(authed), errorMiddleware(RouterAnagraphics.delete));

module.exports = AnagraphicRoutes;