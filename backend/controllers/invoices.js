const { assertExposable } = require('../modules/errors');
const InvoiceColl = require('../models/invoice');
const AnagraphicColl = require('../models/anagraphic');

const InvoicesController = {
	list: async (organization_id, user_id = '*', type, query) => {
		const result = await InvoiceColl.findWithFilters(organization_id, user_id, type, query.q, query.filter, parseInt(query.limit), parseInt(query.offset));
		return result;
	},

	listAnagraphicByType: async (organization_id, type) => {
		const result = await AnagraphicColl.find({ organization_id, type });
		return result;
	},

	single: async (organization_id, id) => {
		const result = await InvoiceColl.findOne({ _id: id });
		assertExposable(result != null, 'invoice_not_found');
		assertExposable(result.organization_id != organization_id, 'access_denied');
		return result;
	},

	create: async (body) =>{
		const invoice = new InvoiceColl(body);
		const result = await invoice.save();
		return result;
	},

	update: async (id, body) => {
		const result = await InvoiceColl.updateOne({ _id: id }, { $set: { ...body } }, { runValidators: true });
		assertExposable(!(result.n < 1 || result.n > 2), 'invoice_not_found'); // check if invoice exist

		return result;
	},
	
	delete: async (id) => {
		const invoice = await  InvoiceColl.findOne({ _id: id });
		assertExposable(invoice != null, 'invoice_not_found');

		const result = await invoice.delete();
		return result;
	}
}

module.exports.InvoicesController = InvoicesController;