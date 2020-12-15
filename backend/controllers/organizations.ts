import OrganizationColl from '../models/organization';
import { assertExposable } from '../modules/errors';

export const OrganizationsController = {
	create: async (body) =>{
		const { name_org } = body;

		const exists = await OrganizationColl.exists({ name_org })
		assertExposable(!exists, 'already_exists');

		const newOrg = new OrganizationColl(body);
		const result = newOrg.save();

		return result;
	}
}