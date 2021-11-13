import * as moment from 'moment';

import QuoteColl from '../models/quote';
import AnagraphicColl from '../models/anagraphic';
import OrganizationColl from '../models/organization';
import { getPercByAteco } from '../utils/ateco-codes';

import { assertExposable } from '../modules/errors';


export const QuotesController = {
	list: async (organization_id: string, user_id: string = '*', query: any) => {
		const result = await QuoteColl.findWithFilters(organization_id, user_id, query.q, query.filter, parseInt(query.limit), parseInt(query.offset));
		return result;
	},

	getLastNr: async (organization_id: string, year: any = new Date().getFullYear()) => {
		const startYearDate = `${year}-01-01`;
		const endYearDate = `${year}-12-31`;

		const result = await QuoteColl.find({organization_id, date_document: { $gte: startYearDate, $lt: endYearDate} }).sort('-nr_document');

		if (result.length < 1) {
			return 0;
		}

		return parseInt(result[0].nr_document);
	},

	listAnagraphicByType: async (organization_id: string) => {
		const result = await AnagraphicColl.find({ organization_id, type: 'CUSTOMER' });
		return result;
	},

	single: async (organization_id: string, id: string) => {
		const result = await QuoteColl.findOne({ _id: id });
		assertExposable(result != null, 'Quote_not_found');
		assertExposable(result.organization_id != organization_id, 'access_denied');
		return result;
	},

	create: async (body: any) =>{
		const Quote = new QuoteColl(body);
		const result = await Quote.save();
		return result;
	},

	update: async (id: string, body: any) => {
		const result = await QuoteColl.updateOne({ _id: id }, { $set: { ...body } }, { runValidators: true });
		assertExposable(!(result.n < 1 || result.n > 2), 'Quote_not_found'); // check if Quote exist

		return result;
	},
	
	delete: async (id: string) => {
		const Quote = await  QuoteColl.findOne({ _id: id });
		assertExposable(Quote != null, 'Quote_not_found');

		const result = await Quote.delete();
		return result;
	},

	analysisQuoteCustomer: async (organization_id: string, year: any = new Date().getFullYear()) => {
		const startYearDate = `${year}-01-01`;
		const endYearDate = `${year}-12-31`;

		const data = await QuoteColl.find({ organization_id, date_document: { $gte: startYearDate, $lt: endYearDate} });
		const org = await OrganizationColl.findOne({ _id: organization_id });

		// get sum of data
		let total: number = 0;
		for (let i = 0; i < data.length; i++) {
			total += data[i].bollo ? data[i].tot - 2 : data[i].tot;
		}

		const taxPerc: number = getPercByAteco(org.codiceAteco);
		
		let taxableIncome: number = total * taxPerc;
		let contributions: number = total * taxPerc;
		if (!org.dittaIndividuale) {
			contributions = contributions * 0.2572;
		} else {
			contributions = total <= 15953 ? 2600 : contributions * 0.2190;
			contributions += 75;
		}
		let taxes: number = ((total * taxPerc)) * 0.05;

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

			chartData[indexMonth][1] += data[i].tot;
			chartData[indexMonth][2] += data[i].tot_document;
			chartData[indexMonth][3] += data[i].tot_iva;

			let singleContributions: number = data[i].tot * taxPerc;
			if (!org.dittaIndividuale) {
				singleContributions = singleContributions * 0.2572;
			} else {
				singleContributions = data[i].tot <= 15953 ? (2600/12) : singleContributions * 0.2190;
				singleContributions += 75;
			}
			let singleTaxes: number = ((data[i].tot * taxPerc)) * 0.05;
			
			chartData[indexMonth][4] += (singleTaxes + singleContributions) as any;
		}

		return {
			total,
			taxableIncome,
			taxes,
			contributions,
			contributionsAndTaxes: taxes + contributions,
			expenses: org.yearlyExpenses,
			netIncome: total - (taxes + contributions) - org.yearlyExpenses,
			chartData
		};
	}
}