import React from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from '../../forms';

const FormLogin = ({ handleSave }) => {
	const { register, handleSubmit } = useForm({});

	const onSubmit = async (data) => {
		await handleSave(data);
	}

	return (
		<form className="margin-40" onSubmit={handleSubmit(onSubmit)}>
      <InputText name="username" label="Username" register={register} isRequired={true} />
      <InputText name="password" label="Password" register={register} isRequired={true} type="password" />

			<input type="submit" className="btn btn-primary" value="Conferma" />
		</form>
	)
}

export default FormLogin;