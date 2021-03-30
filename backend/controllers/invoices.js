const { assertExposable } = require('../modules/errors');
const InvoiceColl = require('../models/invoice');

const InvoicesController = {
	list: async (organization_id, user_id = '*', type_document) => {
		let params = { organization_id, type_document };
		if (user_id !== '*') {
			params['user_id'] = user_id;
		}

		const result = await InvoiceColl.find(params);
		return result;
	},

	single: async (organization_id, id) => {
		const result = await InvoiceColl.findOne({ _id: id });
		assertExposable(invoice != null, 'invoice_not_found');
		assertExposable(result.organization_id == organization_id, 'access_denied');
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