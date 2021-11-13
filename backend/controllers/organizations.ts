import OrganizationColl from '../models/organization';
import { assertExposable } from '../modules/errors';


export const OrganizationsController = {
	create: async (body: any) =>{
		const { name_org } = body;

		const exists = await OrganizationColl.exists({ name_org })
		assertExposable(!exists, 'already_exists');

		const newOrg = new OrganizationColl(body);
		const result = newOrg.save();

		return result;
	},

	single: async (id: string) =>{
		const result = await OrganizationColl.findOne({ _id: id });
		return result;
	}
}