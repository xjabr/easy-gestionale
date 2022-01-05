import * as mongoose from 'mongoose';

const typeDocument = [
	'CLIENTE',
	'FORNITORE'
];

const InvoiceScheme = new mongoose.Schema({
	organization_id: { type: mongoose.Types.ObjectId, required: true, ref: 'organizations' },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
	type: { type: String, required: true, enum: typeDocument },
	type_document: { type: String, required: true },
	nr_document: { type: String, required: true },
	date_document: { type: Date, required: true },
	anagraphic_id: { type: mongoose.Types.ObjectId, required: true, ref: 'anagraphics' },
	payment_method: { type: String, required: false, default: null },
	bank: { type: String, required: false, default: null },
	iban: { type: String, required: false, default: null },
	services: { type: Array, required: false, default: [] },
	discount: { type: Number, required: false, default: 0 },
	bollo: { type: Boolean, required: false, default: false },
	idBollo: { type: String, required: false, default: null },
	tot_document: { type: Number, required: false, default: 0 },
	tot_iva: { type: Number, required: false, default: 0 },
	tot: { type: Number, required: false, default: 0 },
	note: { type: String, required: false, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const createParamsObj = async (userId: any, type: any, organization_id: any, search: any, filter: any, year: any) => {
	// let user = undefined;
	let params: any = {
		organization_id: mongoose.Types.ObjectId(organization_id),
		type,
		date_document: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) }
	};

	if (userId != '*') {
		// user = await UserColl.findOne({ _id: userId });
		params['userId'] = mongoose.Types.ObjectId(userId);
	}

	if (search != undefined) {
		params['$or'] = [
		];
	}

	if (filter != undefined) {
	}

	return params;
}

InvoiceScheme.statics = {
	findWithFilters: async function (organization_id: any, user_id: any, type: any, search: any = undefined, filter: any = undefined, limit: any, offset: any, year: any = new Date().getFullYear(), target: any = 'created_at', sort: any = -1) {
		let params = await createParamsObj(user_id, type, organization_id, search, filter, year);

		// @ts-ignore
		const result = await this.model('invoices').aggregate([
			{
				$match: {
					...params
				}
			},
			{ $limit: limit },
			{ $skip: offset },
			{ $sort: { [target]: sort } },
			{
				$lookup: {
					from: 'users',
					localField: 'user_id',
					foreignField: '_id',
					as: 'userdata'
				}
			},
			{
				$lookup: {
					from: 'anagraphics',
					localField: 'anagraphic_id',
					foreignField: '_id',
					as: 'anagraphicdata'
				}
			}
		]);

		return {
			data: result,
			// @ts-ignore
			length: await this.model('invoices').countDocuments(params)
		}
	}
};


const InvoiceColl = mongoose.model('invoices', InvoiceScheme) as any;
export default InvoiceColl;