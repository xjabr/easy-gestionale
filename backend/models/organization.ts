import * as mongoose from 'mongoose';

// TODO: VALIDATION
const OrganizationsScheme: mongoose.Schema = new mongoose.Schema({
	name_org: { type: String, required: true },
	image_org: { type: String, required: false, default: null },
	p_iva: { type: String, required: true },
	cf: { type: String, required: true },
	city: { type: String, required: true },
	cap: { type: String, required: true },
	country: { type: String, required: true },
	address: { type: String, required: true },
	pec: { type: String, required: true },
	cod_desti: { type: String, required: true },
	iban: { type: String, required: false },
	bank: { type: String, required: false }
});

// Export the model and return your IUser interface
const OrganizationColl = mongoose.model('organization', OrganizationsScheme);
export default OrganizationColl;