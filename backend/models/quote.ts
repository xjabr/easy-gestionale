import * as mongoose from 'mongoose';

const QuoteScheme = new mongoose.Schema({
	organization_id: { type: mongoose.Types.ObjectId, required: true, ref: 'organizations' },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
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

const createParamsObj = async (userId: any, organization_id: any, search: any, filter: any) => {
	// let user = undefined;
	let params: any = {
		organization_id: mongoose.Types.ObjectId(organization_id)
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

QuoteScheme.statics = {
	findWithFilters: async function (organization_id: any, user_id: any, search: any = undefined, filter: any = undefined, limit: any, offset: any, target: any = 'created_at', sort: any = -1) {
		let params = await createParamsObj(user_id, organization_id, search, filter);

		// @ts-ignore
		const result = await this.model('quotes').aggregate([
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
			length: await this.model('quotes').countDocuments(params)
		}
	}
};


const QuoteColl = mongoose.model('quotes', QuoteScheme) as any;
export default QuoteColl;