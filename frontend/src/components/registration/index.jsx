import React, { useState } from 'react';

import { useAuth } from '../../contexts/auth-context';
import FormRegistration from '../../ui-components/forms-components/registration';
import WrapperAuth from '../../ui-components/forms-components/login/wrapper';


const Login = () => {
	const { registration } = useAuth();
	const [error, setError] = useState(null);

	const onSubmit = async (obj) => {
		try {
			const result = await registration(obj);
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
				<FormRegistration error={error} handleSave={onSubmit} />
			</WrapperAuth>
		</>
	)
}

export default Login;