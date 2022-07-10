import * as moment from 'moment';

import InvoiceColl from '../models/invoice';
import AnagraphicColl from '../models/anagraphic';
import OrganizationColl from '../models/organization';

import { assertExposable } from '../modules/errors';

export const InvoicesController = {
	list: async (organization_id: string, user_id: string = '*', type: string, query: any, year: any) => {
		const result = await InvoiceColl.findWithFilters(organization_id, user_id, type, query.q, query.filter, parseInt(query.limit), parseInt(query.offset), year);
		return result;
	},

	getLastNr: async (organization_id: string, type: string, year: any = new Date().getFullYear()) => {
		const startYearDate = `${year}-01-01`;
		const endYearDate = `${year}-12-31`;

		const result = await InvoiceColl.find({organization_id, type, date_document: { $gte: startYearDate, $lt: endYearDate} }).sort('-nr_document');

		if (result.length < 1) {
			return 0;
		}

		return parseInt(result[0].nr_document);
	},

	listAnagraphicByType: async (organization_id: string, type: string) => {
		const result = await AnagraphicColl.find({ organization_id, type });
		return result;
	},

	single: async (organization_id: string, id: string) => {
		const result = await InvoiceColl.findOne({ _id: id });
		assertExposable(result != null, 'invoice_not_found');
		assertExposable(result.organization_id != organization_id, 'access_denied');
		return result;
	},

	create: async (body: any) =>{
		const invoice = new InvoiceColl(body);
		const org = await OrganizationColl.findOne({ _id: body.organization_id });

		const taxPerc: number = (org.impPerc / 100);
		let taxableIncome: number = body.tot * taxPerc;
		let contributions: number = taxableIncome * (org.contribPerc / 100);
		let taxes: number = ((taxableIncome) - contributions) * (org.taxPerc / 100);

		invoice.taxesAmount = taxes;
		invoice.contribAmount = contributions;

		const result = await invoice.save();
		return result;
	},

	update: async (id: string, body: any, organization_id: any) => {
		return {};

		const result = await InvoiceColl.updateOne({ _id: id }, { $set: { ...body } }, { runValidators: true });
		
		assertExposable(!(result.n < 1 || result.n > 2), 'invoice_not_found'); // check if invoice exist

		const org = await OrganizationColl.findOne({ _id: organization_id });

		const taxPerc: number = (org.impPerc / 100);
		let taxableIncome: number = body.tot * taxPerc;
		let contributions: number = taxableIncome * (org.contribPerc / 100);
		let taxes: number = ((taxableIncome) - contributions) * (org.taxPerc / 100);

		const invoice = await InvoiceColl.findOne({ _id: id });

		invoice.taxesAmount = taxes;
		invoice.contribAmount = contributions;

		await invoice.save();

		return result;
	},
	
	delete: async (id: string) => {
		return {};

		const invoice = await  InvoiceColl.findOne({ _id: id });
		assertExposable(invoice != null, 'invoice_not_found');

		const result = await invoice.delete();
		return result;
	},

	analysisInvoiceCustomer: async (organization_id: string, year: any = new Date().getFullYear()) => {
		const startYearDate = `${year}-01-01`;
		const endYearDate = `${year}-12-31`;

		const data = await InvoiceColl.find({ organization_id, type: 'CLIENTE', date_document: { $gte: startYearDate, $lt: endYearDate} });
		const org = await OrganizationColl.findOne({ _id: organization_id });

		// get sum of data
		let total: number = 0;
		let taxes: number = 0;
		let contributions: number = 0;
		for (let i = 0; i < data.length; i++) {
			total += data[i].bollo ? data[i].tot - 2 : data[i].tot;
			taxes += data[i].taxesAmount;
			contributions += data[i].contribAmount;
		}

		// generate chart's data
		var chartData = [
			['Mese', 'Totale', 'Imponibile', 'IVA', 'Tasse + Contributi'],
			['Gennaio', 0, 0, 0, 0],
			['Febbraio', 0, 0, 0, 0],
			['Marzo', 0, 0, 0, 0],
			['Aprile', 0, 0, 0, 0],
			['Maggio', 0, 0, 0, 0],
			['Giugno', 0, 0, 0, 0],
			['Luglio', 0, 0, 0, 0],
			['Agosto', 0, 0, 0, 0],
			['Settembre', 0, 0, 0, 0],
			['Ottobre', 0, 0, 0, 0],
			['Novembre', 0, 0, 0, 0],
			['Dicembre', 0, 0, 0, 0]
		];

		for (let i = 0; i < data.length; i++) {
			var indexMonth = moment(data[i].date_document).get('month') + 1;

			let singleTotal = data[i].bollo ? data[i].tot - 2 : data[i].tot;

			chartData[indexMonth][1] += singleTotal;
			chartData[indexMonth][2] += data[i].tot_document;
			chartData[indexMonth][3] += data[i].tot_iva;

			chartData[indexMonth][4] += data[i].contribAmount + data[i].taxesAmount;
		}

		return {
			total,
			taxes,
			contributions,
			contributionsAndTaxes: taxes + contributions,
			expenses: org.yearlyExpenses,
			netIncome: total - (taxes + contributions) - org.yearlyExpenses,
			chartData
		};
	}
}