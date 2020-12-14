import * as mongoose from 'mongoose';

// TODO: VALIDATION
const CustomerScheme: mongoose.Schema = new mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: false, default: '' },
	p_iva: { type: String, required: false, default: '' },
	cf: { type: String, required: false, default: '' },
	city: { type: String, required: false, default: '' },
	address: { type: String, required: false, default: '' },
	cap: { type: String, required: false, default: '' },
	country: { type: String, required: false, default: '' },
	iban: { type: String, required: false, default: '' },
	pec: { type: String, required: false, default: '' },
	cod_desti: { type: String, required: false, default: '' },
	note: { type: String, required: false, default: '' }
});

// Export the model and return your IUser interface
const CustomerColl = mongoose.model('customer', CustomerScheme);
export default CustomerColl;