const { assertExposable } = require('../modules/errors');
const AnagraphicColl = require('../models/anagraphic');

const AnagraphicsController = {
	list: async (organization_id, user_id, type) => {
		let params = { organization_id, type };
		if (user_id !== '*') {
			params['user_id'] = user_id;
		}

		const result = await AnagraphicColl.find(params);
		return result;
	},

	single: async (organization_id, id) => {
		const result = await AnagraphicColl.findOne({ organization_id, id });
		return result;
	},

	create: async (body) =>{
		const newAnagraphic = new AnagraphicColl(body);
		const result = newAnagraphic.save();
		return result;
	},

	update: async (id, body) => {
		const result = await AnagraphicColl.updateOne({ _id: id }, { $set: { ...body } }, { runValidators: true });
		assertExposable(!(result.n < 1 || result.n > 2), 'anagraphic_not_found'); // check if anagraphic exist

		return result;
	},
	
	delete: async (id) => {
		const anagraphic = await  AnagraphicColl.findOne({ _id: id });
		assertExposable(anagraphic != null, 'anagraphic_not_found');

		const result = await anagraphic.delete();
		return result;
	}
}

module.exports.AnagraphicsController = AnagraphicsController;