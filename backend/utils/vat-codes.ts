import VatCodeColl from '../models/vat-code';

export const getVatCodes = async (forUk: boolean = false) => {
	const results = await VatCodeColl.find({ forUk });
	return results;
}

export const getSingleVatCodeById = async (id: string) => {
	const result = await VatCodeColl.findOne({ _id: id });
	return result;
}

export const getPercByVatCodeName = async (name: string) => {
	const result = await VatCodeColl.findOne({ name });
	return result.perc;
}

export const getPercByVatCodeId = async (id: string) => {
	const result = await VatCodeColl.findOne({ _id: id });
	return result.perc;
}