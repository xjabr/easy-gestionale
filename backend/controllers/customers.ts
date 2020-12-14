import CustomerRoutes from 'routes/customers';
import CustomerColl from '../models/customer';

export const CustomersController = {
	list: async () => {
		const result = await CustomerColl.find();
		return result;
	},

	create: async (body) =>{
		const newCustomer = new CustomerColl(body);
		const result = newCustomer.save();
		return result;
	}
}