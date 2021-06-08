const VatCodeColl = require('../models/vat-code');

const getVatCodes = async (forUk = false) => {
	const results = await VatCodeColl.find({ forUk });
	return results;
}

const getSingleVatCodeById = async (id) => {
	const result = await VatCodeColl.findOne({ _id: id });
	return result;
}

const getPercByVatCodeName = async (name) => {
	const result = await VatCodeColl.findOne({ name });
	return result.perc;
}

const getPercByVatCodeId = async (id) => {
	const result = await VatCodeColl.findOne({ _id: id });
	return result.perc;
}

module.exports.getVatCodes = getVatCodes;
module.exports.getSingleVatCodeById = getSingleVatCodeById;
module.exports.getPercByVatCodeName = getPercByVatCodeName;
module.exports.getPercByVatCodeId = getPercByVatCodeId;