import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { InputText, InputEmail } from '../../forms';

const FormUserWrapper = styled.form`
	position: absolute;
	left: 50%;
	top: 50%;
	width: 450px;
	max-height: 80%;
	overflow: auto;
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


const FormRegistration = ({ error, handleSave }) => {
	const { register, handleSubmit } = useForm({});

	const onSubmit = async (data) => {
		await handleSave(data);
	}

	return (
		<FormUserWrapper className="margin-40" onSubmit={handleSubmit(onSubmit)}>
			<h1>REGISTRATI</h1>

			<hr/>

			{ error ? <div className="alert alert-danger"><strong>{ error }</strong></div> : null }

      <InputText name="first_name" label="Nome" register={register} isRequired={true} />
      <InputText name="last_name" label="Cognome" register={register} isRequired={true} />
      <InputText name="username" label="Username" register={register} isRequired={true} />
      <InputEmail name="email" label="Email" register={register} isRequired={true} />
      <InputText name="password" label="Password" register={register} isRequired={true} type="password" />

			<hr />

			<InputText name="name_org" label="Ragione Sociale" register={register} isRequired={true} />
			<InputText name="p_iva" label="Partita IVA" register={register} isRequired={true} />
			<InputText name="cf" label="Codice Fiscale" register={register} isRequired={true} />

			<hr />

			<InputText name="address" label="Indirizzo" register={register} isRequired={true} />
			<InputText name="city" label="Città" register={register} isRequired={true} />
			<InputText name="cap" label="CAP" register={register} isRequired={true} />
			<InputText name="country" label="Paese" register={register} isRequired={true} />

			<hr />

			<InputText name="pec" label="PEC" register={register} isRequired={true} />
			<InputText name="code_desti" label="Codice Destinatario" register={register} isRequired={true} />

			<hr />

			<InputText name="bank" label="Banca" register={register} isRequired={true} />
			<InputText name="iban" label="IBAN" register={register} isRequired={true} />

			<hr/>

			<input type="submit" className="btn btn-primary btn-block" value="REGISTRATI" />
		</FormUserWrapper>
	)
}

export default FormRegistration;