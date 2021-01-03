const { assertExposable } = require('../modules/errors');
const CustomerColl = require('../models/customer');

const CustomersController = {
	list: async (organization_id) => {
		const result = await CustomerColl.find({ organization_id: organization_id });
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