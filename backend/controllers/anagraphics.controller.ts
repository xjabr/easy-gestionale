import AnagraphicColl from '../models/anagraphic.model';
import { assertExposable } from '../modules/errors';

export const AnagraphicsController = {
	list: async (organization_id: string, user_id: string, type: string, query: any) => {
		const result = await AnagraphicColl.findWithFilters(organization_id, user_id, type, query.q, query.filter, parseInt(query.limit), parseInt(query.offset));
		return result;
	},

	single: async (organization_id: string, id: string) => {
		const result = await AnagraphicColl.findOne({ organization_id, _id: id });
		return result;
	},

	create: async (body: any) =>{
		const newAnagraphic = new AnagraphicColl(body);
		const result = newAnagraphic.save();
		return result;
	},

	update: async (id: string, body: any) => {
		const result = await AnagraphicColl.updateOne({ _id: id }, { $set: { ...body } }, { runValidators: true });
		assertExposable(!(result.n < 1 || result.n > 2), 'anagraphic_not_found'); // check if anagraphic exist

		return result;
	},
	
	delete: async (id: string) => {
		const anagraphic = await  AnagraphicColl.findOne({ _id: id });
		assertExposable(anagraphic != null, 'anagraphic_not_found');

		const result = await anagraphic.delete();
		return result;
	}
}