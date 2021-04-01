const mongoose = require('mongoose');

const type = ['CUSTOMER', 'SUPPLIER']

// TODO: VALIDATION
const CustomerScheme = new mongoose.Schema({
	organization_id: { type: mongoose.Types.ObjectId, ref: 'organizations' },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
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
	type: { type: String, required: true, enum: type },
	note: { type: String, required: false, default: '' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Export the model and return your IUser interface
const CustomerColl = mongoose.model('customers', CustomerScheme);
module.exports = CustomerColl;