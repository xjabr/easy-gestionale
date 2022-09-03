import React from 'react';
import { useForm } from 'react-hook-form';
import { InputText, InputNumber, InputEmail, InputTextArea } from '../../forms';

const FormAnagraphic = ({ customer = null, handleSave, type = 'customer' }) => {
	const { register, handleSubmit } = useForm({});

	const onSubmit = async (data) => {
		data = { ...data, type };
		await handleSave(data);
	}

	return (
		<form className="margin-40" onSubmit={handleSubmit(onSubmit)}>
			<div className="row mb-3">
				<div className="col-md-8">
					<InputText defaultValue={customer === null ? '' : customer.first_name} name="first_name" label="Ragione Sociale/Nome e Cognome" register={register} isRequired={true} />
				</div>
				<div className="col-md-4">
					<InputEmail defaultValue={customer === null ? '' : customer.email} name="email" label="Email" register={register} isRequired={true} />
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-md-4">
					<InputNumber defaultValue={customer === null ? '' : customer.phone} name="phone" validation={/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/} label="Numero di Telefono" register={register} isRequired={true} />
				</div>
				<div className="col-md-4">
					<InputText defaultValue={customer === null ? '' : customer.p_iva} name="p_iva" label="Partita Iva" register={register} isRequired={false} />
				</div>
				<div className="col-md-4">
					<InputText defaultValue={customer === null ? '' : customer.cf} name="cf" label="Codice Fiscale" register={register} isRequired={false} />
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-md-4">
					<InputText defaultValue={customer === null ? '' : customer.city} name="city" label="Città" register={register} isRequired={false} />
				</div>
				<div className="col-md-4">
					<InputText defaultValue={customer === null ? '' : customer.address} name="address" label="Indirizzo" register={register} isRequired={false} />
				</div>
				<div className="col-md-4">
					<InputText defaultValue={customer === null ? '' : customer.country} name="country" label="Nazione" register={register} isRequired={false} />
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-md-4">
					<InputText defaultValue={customer === null ? '' : customer.cap} name="cap" label="CAP" register={register} isRequired={false} />
				</div>
				<div className="col-md-4">
					<InputText defaultValue={customer === null ? '' : customer.iban} name="iban" label="IBAN" register={register} isRequired={false} />
				</div>
				<div className="col-md-4">
					<InputEmail defaultValue={customer === null ? '' : customer.pec} name="pec" label="Indirizzo PEC" register={register} isRequired={false} />
				</div>
			</div>

			<div className="row">
				<div className="col-md-4">
					<InputText defaultValue={customer === null ? '' : customer.cod_desti} name="cod_desti" label="Codice Destinatario" register={register} isRequired={false} />
				</div>
			</div>

			<hr />

			<InputTextArea defaultValue={customer === null ? '' : customer.note} name="note" label="Note" register={register} isRequired={false} />


			<hr />

			<input type="submit" className="btn btn-primary" value="Conferma" />
		</form>
	)
}

export default FormAnagraphic;