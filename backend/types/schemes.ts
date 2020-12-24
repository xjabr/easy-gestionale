const Joi = require("@hapi/joi");

const schemes = {
	customer: Joi.object({
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		email: Joi.string().email().required(),
		phone: Joi.string().required(),
		p_iva: Joi.string().max(1).optional(),
		cf: Joi.string().max(16).optional(),
		city: Joi.string().optional(),
		address: Joi.string().optional(),
		cap: Joi.string().max(5).optional(),
		country: Joi.string().optional(),
		iban: Joi.string().optional(),
		pec: Joi.string().optional(),
		cod_desti: Joi.string().optional(),
		note: Joi.string().optional()
	}),

	organization: Joi.object({
		name_org: Joi.string().required(),
		image_org: Joi.string().required(),
		p_iva: Joi.string().max(13).required(),
		cf: Joi.string().max(16).required(),
		city: Joi.string().required(),
		cap: Joi.string().max(5).required(),
		country: Joi.string().required(),
		address: Joi.string().required(),
		pec: Joi.string().optional(),
		cod_desti: Joi.string().optional(),
		iban: Joi.string().optional(),
		bank: Joi.string().optional()
	})
}

export default schemes;