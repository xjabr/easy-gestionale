import React from 'react';

import { httpGet, httpPost, httpPatch, httpDelete } from '../http';
import { useAuth } from '../contexts/auth-context';
import { QUOTE_ENDPOINT } from '../constants/API_ENDPOINT';

const QuoteContext = React.createContext();

const QuoteProvider = (props) => {
	const { jwtToken } = useAuth();

	const listQuotes = async (query, filter, limit, offset) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${QUOTE_ENDPOINT}/list`, jwtToken, {
				filter,
				q: query,
				limit,
				offset
			})

			obj = {
				data: result.data,
				error: null,
				meta: null,
				status: result.status
			}
		} catch (err) {
			obj = {
				data: null,
				error: err,
				meta: null,
				status: null
			}
		}

		return obj;
	}

	const getLastNr = async () => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${QUOTE_ENDPOINT}/last-nr`, jwtToken, { })

			obj = {
				data: result.data,
				error: null,
				meta: null,
				status: result.status
			}
		} catch (err) {
			obj = {
				data: null,
				error: err,
				meta: null,
				status: null
			}
		}

		return obj;
	}

	const getVatCodes = async () => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${QUOTE_ENDPOINT}/vat-codes`, jwtToken, {});

			obj = {
				data: result.data,
				error: null,
				meta: null,
				status: result.status
			}
		} catch (err) {
			obj = {
				data: null,
				error: err,
				meta: null,
				status: null
			}
		}

		return obj;
	}

  const getAnagraphicsForQuote = async () => {
    let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${QUOTE_ENDPOINT}/list-anagraphics`, jwtToken);
			obj.data = result.data;
			obj.status = result.status;
		} catch (err) {
			obj.error = err;
		}

		return obj;
  }

	const getSingleQuote = async (id) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${QUOTE_ENDPOINT}/single/${id}`, jwtToken, {})

			obj = {
				data: result.data,
				error: null,
				meta: null,
				status: result.status
			}
		} catch (err) {
			obj = {
				data: null,
				error: err,
				meta: null,
				status: null
			}
		}

		return obj;
	}
	
	const analysisCustomerQuotes = async () => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${QUOTE_ENDPOINT}/analysis-customer-Quotes`, jwtToken, {})

			obj = {
				data: result.data,
				error: null,
				meta: null,
				status: result.status
			}
		} catch (err) {
			obj = {
				data: null,
				error: err,
				meta: null,
				status: null
			}
		}

		return obj;
	}

	const createQuote = async (data) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpPost(`${QUOTE_ENDPOINT}`, jwtToken, data)

			obj = {
				data: result.data,
				error: null,
				meta: null,
				status: result.status
			}
		} catch (err) {
			obj = {
				data: null,
				error: err,
				meta: null,
				status: null
			}
		}

		return obj;
	}

	const updateQuote = async (id, data) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		};

		try {
			const result = await httpPatch(`${QUOTE_ENDPOINT}`, jwtToken, data, id);
			obj = {
				data: result.data,
				error: null,
				meta: null,
				status: result.status,
			};
		} catch (err) {
			obj = {
				data: null,
				error: err,
				meta: null,
				status: null
			}
		}

		return obj;
	}

	const deleteQuote = async (id) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		};

		try {
			const result = await httpDelete(`${QUOTE_ENDPOINT}`, jwtToken, id);
			obj = {
				data: result.data,
				error: null,
				meta: null,
				status: result.status,
			};
		} catch (err) {
			obj = {
				data: null,
				error: err,
				meta: null,
				status: null
			}
		}

		return obj;
	}

	return (
		<QuoteContext.Provider
			value={{
				listQuotes,
				getLastNr,
				analysisCustomerQuotes,
				getSingleQuote,
        getAnagraphicsForQuote,
				createQuote,
				updateQuote,
				deleteQuote,
				getVatCodes
			}}
			{...props}
		/>
	)
}

const useQuote = () => React.useContext(QuoteContext);

export { QuoteProvider, useQuote }