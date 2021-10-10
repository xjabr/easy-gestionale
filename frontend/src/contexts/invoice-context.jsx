import React from 'react';

import { httpGet, httpPost, httpPatch, httpDelete } from '../http';
import { useAuth } from '../contexts/auth-context';
import { INVOICE_ENDPOINT } from '../constants/API_ENDPOINT';

const InvoiceContext = React.createContext();

const InvoiceProvider = (props) => {
	const { jwtToken } = useAuth();

	const listInvoices = async (type, query, filter, limit, offset) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${INVOICE_ENDPOINT}/list/${type}`, jwtToken, {
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

	const getLastNr = async (type) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${INVOICE_ENDPOINT}/last-nr/${type}`, jwtToken, { })

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
			const result = await httpGet(`${INVOICE_ENDPOINT}/vat-codes`, jwtToken, {});

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

  const getAnagraphicsForInvoice = async (type) => {
    let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${INVOICE_ENDPOINT}/list-anagraphics/${type}`, jwtToken);
			obj.data = result.data;
			obj.status = result.status;
		} catch (err) {
			obj.error = err;
		}

		return obj;
  }

	const getSingleInvoice = async (id) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${INVOICE_ENDPOINT}/${id}`, jwtToken, {})

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

	const createInvoice = async (data) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpPost(`${INVOICE_ENDPOINT}`, jwtToken, data)

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

	const updateInvoice = async (id, data) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		};

		try {
			const result = await httpPatch(`${INVOICE_ENDPOINT}`, jwtToken, data, id);
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

	const deleteInvoice = async (id) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		};

		try {
			const result = await httpDelete(`${INVOICE_ENDPOINT}`, jwtToken, id);
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
		<InvoiceContext.Provider
			value={{
				listInvoices,
				getLastNr,
				getSingleInvoice,
        getAnagraphicsForInvoice,
				createInvoice,
				updateInvoice,
				deleteInvoice,
				getVatCodes
			}}
			{...props}
		/>
	)
}

const useInvoice = () => React.useContext(InvoiceContext);

export { InvoiceProvider, useInvoice }