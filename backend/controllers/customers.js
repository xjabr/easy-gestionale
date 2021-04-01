const { assertExposable } = require('../modules/errors');
const CustomerColl = require('../models/customer');
const { param } = require('../routes/customers');

const CustomersController = {
	list: async (organization_id, user_id, type) => {
		let params = { organization_id, type };
		if (user_id !== '*') {
			params['user_id'] = user_id;
		}

		const result = await CustomerColl.find(params);
		return result;
	},

	single: async (organization_id, id) => {
		const result = await CustomerColl.findOne({ organization_id, id });
		return result;
	},

	create: async (body) =>{
		const newCustomer = new CustomerColl(body);
		const result = newCustomer.save();
		return result;
	},

	update: async (id, body) => {
		const result = await CustomerColl.updateOne({ _id: id }, { $set: { ...body } }, { runValidators: true });
		assertExposable(!(result.n < 1 || result.n > 2), 'customer_not_found'); // check if customer exist

		return result;
	},
	
	delete: async (id) => {
		const customer = await  CustomerColl.findOne({ _id: id });
		assertExposable(customer != null, 'customer_not_found');

		const result = await customer.delete();
		return result;
	}
}

module.exports.CustomersController = CustomersController;