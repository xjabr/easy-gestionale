import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';

import { httpGet, httpPost } from '../http';
import { AUTH_ENDPOINT, ORGANIZATIONS_ENDPOINT } from '../constants/API_ENDPOINT';

const AuthContext = React.createContext();

function AuthProvider(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [jwtToken, setJwtToken] = useState();
	const [id, setId] = useState(null);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState(null);
	const [ateco, setAteco] = useState(null);
	const [userEmail, setUserEmail] = useState(null);

	useEffect(() => {
		const existingToken = localStorage.getItem('access_token')

		const fetchUserData = async () => {
			const result = await httpGet(`${AUTH_ENDPOINT}/my-info`, existingToken, {});
			setUser(result.data);
		}

		if (existingToken) {
			let decodedToken = jwt(existingToken, { complete: true })
			let dateNow = new Date()
			if (decodedToken.exp > dateNow.getTime()) {
				setId(decodedToken._id)
				setUserEmail(decodedToken.email)
				setUsername(decodedToken.username)
				setJwtToken(existingToken)
				setIsLoggedIn(true)
				setAteco(decodedToken.ateco);
				fetchUserData()
			}

			return ;
		}

		// if (window.location.pathname !== '/login' || window.location.pathname !== '/registration') {
			// window.location.href = "/login";
		// }
	}, [])

	const setToken = (token) => {
		localStorage.setItem('access_token', token)
		setIsLoggedIn(true)
		setJwtToken(token)
	}

	const login = async (body) => {
		const { email, password } = body

		const result = await httpPost(`${AUTH_ENDPOINT}/login`, null, { email, password })
		return result;
	}

	const getMyInfo = async () => {
		try {
			const result = await httpGet(`${AUTH_ENDPOINT}/my-info`, jwtToken, {});
			return result.data;
		} catch (err) {
			return err;
		}
	}

	const registration = async (body) => {
		// first get organizations data and create it
		const {
			name_org,
			p_iva,
			cf,
			city,
			cap,
			country,
			address,
			pec,
			cod_desti,
			iban,
			bank,
			regimeForfettario,
			dittaIndividuale,
			codiceAteco
		} = body

		const organization = await httpPost(`${ORGANIZATIONS_ENDPOINT}/`, null, {
			name_org,
			p_iva,
			cf,
			city,
			cap,
			country,
			address,
			pec,
			cod_desti,
			iban,
			bank,
			regimeForfettario,
			dittaIndividuale,
			codiceAteco
		});

		const organizationId = organization.data._id;
		if (organizationId === undefined || organizationId === null) return alert('Impossibile creare l\'account, contatta l\'assistenza per ricevere maggior informazioni.');

		// get data user and create it
		const {
			first_name,
			last_name,
			email,
			username,
			password
		} = body

		const user = await httpPost(`${AUTH_ENDPOINT}/create`, null, {
			organization_id: organizationId,
			first_name,
			last_name,
			email,
			username,
			password,
			role: 'ADMIN'
		});

		return user;
	}

	const logout = async () => {
		const existingToken = localStorage.getItem('access_token')

		if (existingToken) {
			let decodedToken = jwt(existingToken, { complete: true })
			const req = await httpPost(`${AUTH_ENDPOINT}/logout`, existingToken, { email: decodedToken.email })
			if (req.data) {
				localStorage.removeItem('access_token')
				setIsLoggedIn(false)
			}
		}
	}

	const forgotPassword = async (email) => {
		let obj = {
			data: null, // 2XX-3XX
			error: null, // 4XX+
			meta: null, // if applicable
			status: null, // always
		}

		try {
			const req = await httpPost(`${AUTH_ENDPOINT}/forgot`, null, { email })
			obj = {
				data: req.data,
				error: null,
				meta: null,
				status: req.status,
			}

			return obj
		} catch (err) {
			obj = {
				data: null,
				error: err.response.data.error.description,
				meta: null,
				status: err.response.status,
			}
			return obj
		}
	}

	const resetPassword = async (body) => {
		let obj = {
			data: null, // 2XX-3XX
			error: null, // 4XX+
			meta: null, // if applicable
			status: null, // always
		}

		try {
			const req = await httpPost(`${AUTH_ENDPOINT}/reset`, null, body)
			obj = {
				data: req.data,
				error: null,
				meta: null,
				status: req.status,
			}

			return obj
		} catch (err) {
			obj = {
				data: null,
				error: err.response.data.error.description || err.response.data.error.message,
				meta: null,
				status: err.response.status,
			}
			return obj
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggedIn,
				jwtToken,
				setToken,
				login,
				registration,
				logout,
				id,
				getMyInfo,
				username,
				userEmail,
				forgotPassword,
				resetPassword,
				ateco
			}}
			{...props}
		/>
	)
}
const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }