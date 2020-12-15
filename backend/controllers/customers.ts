import CustomerColl from '../models/customer';

export const CustomersController = {
	list: async (organization_id) => {
		const result = await CustomerColl.find({ organization_id: organization_id });
		return result;
	},

	create: async (body) =>{
		const newCustomer = new CustomerColl(body);
		const result = newCustomer.save();
		return result;
	}
}