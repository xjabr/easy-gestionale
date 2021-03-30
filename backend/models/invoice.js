const mongoose = require('mongoose');

const typeDocument = [
	'CLIENTE',
	'FORNITORE',
	'NOTA CREDITO'
];

const InvoiceScheme = new mongoose.Schema({
	organization_id: { type: mongoose.Types.ObjectId, required: true, ref: 'organizations' },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
	type_document: { type: String, required: true, enum: typeDocument },
	nr_document: { type: mongoose.Types.ObjectId, required: true },
	date_document: { type: Date, required: true },
	customer_id: { type: mongoose.Types.ObjectId, required: false, default: null },
	supplier_id: { type: mongoose.Types.ObjectId, required: false, default: null },
	payment_method: { type: String, required: false, default: null },
	bank: { type: String, required: false, default: null },
	services: { type: Array, required: false, default: [] },
	tot_document: { type: Number, required: false, default: 0 },
	tot_iva: { type: Number, required: false, default: 0 },
	tot: { type: Number, required: false, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const InvoiceColl = mongoose.model('invoices', InvoiceScheme);
module.exports = InvoiceColl;