const express = require('express');
const rateLimit = require('express-rate-limit');

const validation = require('../utils/validation');
const { UsersController } = require('../controllers/users');
const { authMiddleware } = require('../middleware/auth.middleware');
const errorMiddleware = require('../middleware/errors.middleware');

const Joi = require('joi');

const RouterUsers = {
  /** @type {import("express").RequestHandler} */
	login: async (req, res, _next) => {
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});

		await validation.validateParams(schema, req.body)

		const token = await UsersController.signin(req.body);
		res.send({ token });
	},

  /** @type {import("express").RequestHandler} */
	create: async (req, res, _next) => {
		// validate body
		const schema = Joi.object({
			organization_id: Joi.string().required(),
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			username: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			role: Joi.string().required()
		});
		await validation.validateParams(schema, req.body)

		// create account
		const result = await UsersController.create(req.body);
		res.status(201).send(result);
	},

  /** @type {import("express").RequestHandler} */
	logout: async (req, res, _next) => {
		const schema = Joi.object({
			email: Joi.string().email().required(),
		});

		await validation.validateParams(schema, req.body)
		await UsersController.signout(req.body.email);

		res.status(200).send('OK');
	}
}

const UserRoutes = express.Router();
const authed = authMiddleware.authAssert({ isActive: true, isVerified: false, isAdmin: false });

const limitRequestsMiddleware = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 15,
	message: {
		status: 429,
		message: 'Too many requests, please try again in an hour'
	}
});

UserRoutes.post('/login', limitRequestsMiddleware, errorMiddleware(RouterUsers.login));
UserRoutes.post('/create', limitRequestsMiddleware, errorMiddleware(RouterUsers.create));
UserRoutes.post('/logout', errorMiddleware(authed), errorMiddleware(RouterUsers.logout));

module.exports = UserRoutes;
