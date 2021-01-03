import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { InputText, InputEmail } from '../../forms';

const FormUserWrapper = styled.form`
	position: absolute;
	left: 50%;
	top: 50%;
	width: 450px;
	background: #fff;
	padding: 20px 40px;
	transform: translate(-50%, -50%);
	z-index: 2;

	h1 {
		text-align: center;
		font-weight: bold;
		font-size: 28px;
		color: #000;
	}

	.btn {
		width: 100%
	}
`


const FormLogin = ({ error, handleSave }) => {
	const { register, handleSubmit } = useForm({});

	const onSubmit = async (data) => {
		await handleSave(data);
	}

	return (
		<FormUserWrapper className="margin-40" onSubmit={handleSubmit(onSubmit)}>
			<h1>ACCEDI</h1>

			<hr/>

			{ error ? <div className="alert alert-danger"><strong>{ error }</strong></div> : null }

      <InputEmail name="email" label="Email" register={register} isRequired={true} />
      <InputText name="password" label="Password" register={register} isRequired={true} type="password" />

			<hr/>

			<input type="submit" className="btn btn-primary btn-block" value="ACCEDI" />
		</FormUserWrapper>
	)
}

export default FormLogin;