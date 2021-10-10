import * as Joi from "joi";

const schemes = {
	anagraphic: Joi.object({
		first_name: Joi.string().required(),
		email: Joi.string().email().required(),
		phone: Joi.string().required(),
		p_iva: Joi.string().max(13).allow("").optional(),
		cf: Joi.string().max(16).allow("").optional(),
		city: Joi.string().allow("").optional(),
		address: Joi.string().allow("").optional(),
		cap: Joi.string().max(5).allow("").optional(),
		country: Joi.string().allow("").optional(),
		iban: Joi.string().allow("").optional(),
		pec: Joi.string().allow("").optional(),
		cod_desti: Joi.string().allow("").optional(),
		type: Joi.string().required(),
		note: Joi.string().allow("").optional()
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
		type: Joi.string().required(),
		type_document: Joi.string().required(),
		nr_document: Joi.number().required(),
		date_document: Joi.date().required(),
		anagraphic_id: Joi.string().required(),
		payment_method: Joi.string().allow(null).allow("").optional(),
		bank: Joi.string().allow(null).allow("").optional(),
		iban: Joi.string().allow(null).allow("").optional(),
		services: Joi.array().default([]).optional(),
		discount: Joi.number().allow(null).optional(),
		other_taxes: Joi.number().allow(null).optional(),
		tot_document: Joi.number().allow(null).optional(),
		tot_iva: Joi.number().allow(null).optional(),
		tot: Joi.number().allow(null).optional(),
		note: Joi.string().allow(null).allow("").optional(),
	})
}

export default schemes;