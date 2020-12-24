import React, { useState } from 'react';

import { useAuth } from '../../contexts/auth-context';
import FormLogin from '../../ui-components/forms-components/login';


const Login = () => {
	const { setToken, login } = useAuth();
	const [error, setError] = useState(null);

	const onSubmit = async (obj) => {
		try {
			const result = await login(obj);
			const { token } = result.data;
			setToken(token);
		} catch (err) {
			const { data } = err.response;
			setError(data.error.description);
		}
	}

	return (
		<>
			<div>
				<h1>Welcome back to ClinicSoul</h1>
				<FormLogin handleSave={onSubmit} />
				{ error }
			</div>
		</>
	)
}

export default Login;