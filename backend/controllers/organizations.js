const OrganizationColl = require('../models/organization');
const { assertExposable } = require('../modules/errors');

const OrganizationsController = {
	create: async (body) =>{
		const { name_org } = body;

		const exists = await OrganizationColl.exists({ name_org })
		assertExposable(!exists, 'already_exists');

		const newOrg = new OrganizationColl(body);
		const result = newOrg.save();

		return result;
	}
}

module.exports.OrganizationsController = OrganizationsController;