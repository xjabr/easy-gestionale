import { assertExposable } from '../modules/errors';
import InvoiceColl from '../models/invoice';
import AnagraphicColl from '../models/anagraphic';

export const InvoicesController = {
	list: async (organization_id, user_id = '*', type, query) => {
		const result = await InvoiceColl.findWithFilters(organization_id, user_id, type, query.q, query.filter, parseInt(query.limit), parseInt(query.offset));
		return result;
	},

	getLastNr: async (organization_id, type, year = new Date().getFullYear()) => {
		const startYearDate = `${year}-01-01`;
		const endYearDate = `${year}-12-31`;

		const result = await InvoiceColl.find({organization_id, type, date_document: { $gte: startYearDate, $lt: endYearDate} }).sort('-nr_document');

		if (result.length < 1) {
			return 0;
		}

		return parseInt(result[0].nr_document);
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