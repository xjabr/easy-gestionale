import React from 'react';

import { httpGet, httpPost, httpPatch, httpDelete } from '../http';
import { useAuth } from '../contexts/auth-context';
import { ANAGRAPHIC_ENDPOINT } from '../constants/API_ENDPOINT';

const AnagraphicContext = React.createContext();

const AnagraphicProvider = (props) => {
	const { jwtToken } = useAuth();

	const listAnagraphic = async (type, query, filter, limit, offset) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${ANAGRAPHIC_ENDPOINT}/list/${type}`, jwtToken, {
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

	const getSingleAnagraphic = async (id) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpGet(`${ANAGRAPHIC_ENDPOINT}/${id}`, jwtToken, {})

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

	const createAnagraphic = async (data) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		}

		try {
			const result = await httpPost(`${ANAGRAPHIC_ENDPOINT}`, jwtToken, data)

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

	const updateAnagraphic = async (id, data) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		};

		try {
			const result = await httpPatch(`${ANAGRAPHIC_ENDPOINT}`, jwtToken, data, id);
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

	const deleteAnagraphic = async (id) => {
		let obj = {
			data: null,
			error: null,
			meta: null,
			status: null
		};

		try {
			const result = await httpDelete(`${ANAGRAPHIC_ENDPOINT}`, jwtToken, id);
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
		<AnagraphicContext.Provider
			value={{
				listAnagraphic,
				getSingleAnagraphic,
				createAnagraphic,
				updateAnagraphic,
				deleteAnagraphic
			}}
			{...props}
		/>
	)
}

const useAnagraphic = () => React.useContext(AnagraphicContext);

export { AnagraphicProvider, useAnagraphic }