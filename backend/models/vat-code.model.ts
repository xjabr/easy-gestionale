import * as mongoose from 'mongoose';

const VatCodeScheme = new mongoose.Schema({
	name: { type: String, required: true, default: '' },
	description: { type: String, required: true, default: '' },
	perc: { type: Number, required: true, default: 0 },
	label: { type: String, required: true, default: '' },
	forUk: { type: Boolean, required: false, default: false },
});

const VatCodeColl = mongoose.model('vatcodes', VatCodeScheme) as any;
export default VatCodeColl