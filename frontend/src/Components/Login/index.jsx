import React, { useState } from 'react';

import { useAuth } from '../../contexts/auth-context';
import FormLogin from '../../ui-components/forms-components/login';
import WrapperAuth from '../../ui-components/forms-components/login/wrapper';


const Login = () => {
	const { setToken, login } = useAuth();
	const [error, setError] = useState(null);

	const onSubmit = async (obj) => {
		try {
			const result = await login(obj);
			const { token } = result.data;
			setToken(token);
		} catch (err) {
			const { data, status } = err.response;

			if (status === 429) {
				return setError(data.message)
			}

			return setError(data.error.description);
		}
	}

	return (
		<>
			<WrapperAuth>
				<FormLogin error={error} handleSave={onSubmit} />
			</WrapperAuth>
		</>
	)
}

export default Login;