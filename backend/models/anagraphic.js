const mongoose = require('mongoose');

const type = ['CUSTOMER', 'SUPPLIER']

// TODO: VALIDATION
const AnagraphicScheme = new mongoose.Schema({
	organization_id: { type: mongoose.Types.ObjectId, ref: 'organizations' },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: false, default: null },
	p_iva: { type: String, required: false, default: null },
	cf: { type: String, required: false, default: null },
	sdi: { type: String, required: false, default: null },
	city: { type: String, required: false, default: null },
	address: { type: String, required: false, default: null },
	cap: { type: String, required: false, default: null },
	country: { type: String, required: false, default: null },
	iban: { type: String, required: false, default: null },
	pec: { type: String, required: false, default: null },
	cod_desti: { type: String, required: false, default: null },
	type: { type: String, required: true, enum: type },
	note: { type: String, required: false, default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Export the model and return your IUser interface
const AnagraphicColl = mongoose.model('anagraphics', AnagraphicScheme);
module.exports = AnagraphicColl;