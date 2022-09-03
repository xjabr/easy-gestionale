import * as mongoose from 'mongoose';

const type = ['customer', 'supplier']

// TODO: VALIDATION
const AnagraphicScheme = new mongoose.Schema({
	organization_id: { type: mongoose.Types.ObjectId, ref: 'organizations' },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
	first_name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: false, default: null },
	p_iva: { type: String, required: false, default: null },
	cf: { type: String, required: false, default: null },
	sdi: { type: String, required: false, default: null },
	address: { type: String, required: false, default: null },
	city: { type: String, required: false, default: null },
	country: { type: String, required: false, default: null },
	cap: { type: String, required: false, default: null },
	iban: { type: String, required: false, default: null },
	pec: { type: String, required: false, default: null },
	cod_desti: { type: String, required: false, default: null },
	type: { type: String, required: true, enum: type },
	note: { type: String, required: false, default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const createParamsObj = async (userId: any, type: any, organization_id: any, search: any, filter: any) => {
	// let user = undefined;
	let params: any = {
		organization_id: mongoose.Types.ObjectId(organization_id),
		type
	};

	if (userId != '*') {
		// user = await UserColl.findOne({ _id: userId });
		params['userId'] = mongoose.Types.ObjectId(userId);
	}

	if (search != undefined) {
		params['$or'] = [
			{ first_name: { $regex: '^' + search, $options: 'i' } },
			{ phone: { $regex: '^' + search, $options: 'i' } },
			{ email: { $regex: '^' + search, $options: 'i' } }
		];
	}

	if (filter != undefined) {
	}

	return params;
}

AnagraphicScheme.statics = {
	findWithFilters: async function (organization_id: any, user_id: any, type: any, search: any = undefined, filter: any = undefined, limit: any, offset: any, target: any = 'created_at', sort: any = -1) {
		let params = await createParamsObj(user_id, type, organization_id, search, filter);
		// @ts-ignore
		const result = await this.model('anagraphics').aggregate([
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
			}
		]);

		return {
			data: result,
		// @ts-ignore
			length: await this.model('anagraphics').countDocuments(params)
		}
	}
};

const AnagraphicColl: any = mongoose.model('anagraphics', AnagraphicScheme);
export default AnagraphicColl;