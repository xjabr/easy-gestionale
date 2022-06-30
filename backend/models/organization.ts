import * as mongoose from 'mongoose';

// TODO: VALIDATION
const OrganizationsScheme = new mongoose.Schema({
	name_org: { type: String, required: true },
	image_org: { type: String, required: false, default: null },
	p_iva: { type: String, required: true },
	cf: { type: String, required: true },
	city: { type: String, required: true },
	cap: { type: String, required: true },
	country: { type: String, required: true },
	address: { type: String, required: true },
	pec: { type: String, required: false },
	cod_desti: { type: String, required: false },
	iban: { type: String, required: false },
	bank: { type: String, required: false },
	regimeForfettario: { type: Boolean, required: false },
	dittaIndividuale: { type: Boolean, required: false },
	codiceAteco: { type: String, required: false },
	yearlyExpenses: { type: Number, required: false, default: 0.00 },
	ukOrganization: { type: Boolean, required: false, default: false },
	nin: { type: String, required: false, default: null },
});

// Export the model and return your IUser interface
const OrganizationColl = mongoose.model('organizations', OrganizationsScheme) as any;
export default OrganizationColl;