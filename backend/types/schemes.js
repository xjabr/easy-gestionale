const Joi = require("joi");
const { join } = require("lodash");

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
		type: Joi.string().required(),
		note: Joi.string().optional()
	}),

	organization: Joi.object({
		name_org: Joi.string().required(),
		image_org: Joi.string().allow(null).optional(),
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
	}),

	invoice: Joi.object({
		type_document: Joi.string().required(),
		nr_document: Joi.number().required(),
		date_document: Joi.date().required(),
		customer_id: Joi.string().allow(null).required(),
		supplier_id: Joi.string().allow(null).required(),
		payment_method: Joi.string().required(),
		bank: Joi.string().required(),
		services: Joi.array().default([]).required(),
		tot_document: Joi.number().required(),
		tot_iva: Joi.number().required(),
		tot: Joi.number().required()
	})
}

module.exports = schemes;