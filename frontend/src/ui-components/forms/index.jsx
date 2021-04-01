import React, { useState } from 'react';
import moment from 'moment';

export const InputText = ({ defaultValue = undefined, name, label, placeholder = '', register = () => {}, isRequired = false, validation = null, onChange = null, type = 'text' }) => {
	const [error, setError] = useState(false);

	const handleValidation = (e) => {
		let value = String(e.target.value);

		if (onChange != null) {
			onChange(e.target.value);
		}

		if (validation == null) {
			return 
		}
		
		if (value.match(validation) || value.length < 1) {
			setError(false);
			return ;
		}

		setError(true);
	}

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<input defaultValue={defaultValue} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} ref={register({ required: isRequired })} placeholder={placeholder} type={type} onChange={handleValidation} />
		</>
	)
};

export const InputEmail = ({ defaultValue = undefined, name, label, placeholder = '', register = () => {}, isRequired = false, validation = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, onChange = null }) => {
	const [error, setError] = useState(false);

	const handleValidation = (e) => {
		let value = String(e.target.value);
		
		if (onChange != null) {
			onChange(e.target.value);
		}
		
		if (validation == null) {
			return ;
		}

		if (value.match(validation) || value.length < 1) {
			setError(false);
			return ;
		}

		setError(true);
	}

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<input defaultValue={defaultValue} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} ref={register({ required: isRequired })} placeholder={placeholder} type="email" onChange={handleValidation} />
		</>
	)
};

export const InputNumber = ({ defaultValue = undefined, name, label, placeholder = '', register = () => {}, isRequired = false, validation = /^[0-9]+$/, onChange = null }) => {
	const [error, setError] = useState(false);

	const handleValidation = (e) => {
		let value = String(e.target.value);
		
		if (onChange != null) {
			onChange(e.target.value);
		}

		if (validation == null) {
			return ;
		}

		if (value.match(validation) || value.length < 1) {
			setError(false);
			return ;
		}
		
		setError(true);
	}

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<input defaultValue={defaultValue} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} ref={register({ required: isRequired })} placeholder={placeholder} type="text" onChange={handleValidation} />
		</>
	)
};

export const InputTextArea = ({ defaultValue = undefined, name, label, placeholder = '', register = () => {}, isRequired = false, validation = null, onChange = null }) => {
	const [error, setError] = useState(false);

	const handleValidation = (e) => {
		let value = String(e.target.value);
		
		if (onChange != null) {
			onChange(e.target.value);
		}

		if (validation == null) {
			return ;
		}

		if (value.match(validation) || value.length < 1) {
			setError(false);
			return ;
		}
		
		setError(true);
	}

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<textarea defaultValue={defaultValue} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} ref={register({ required: isRequired })} placeholder={placeholder} onChange={handleValidation}></textarea>
		</>
	)
};


export const InputDate = ({ defaultValue = undefined, name, label, placeholder = '', register = () => {}, isRequired = false, validation = null, onChange = null }) => {
	const handleValidation = (e) => {
		if (onChange != null) {
			onChange(e.target.value);
		}
	}

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<input defaultValue={defaultValue} className={'form-control'} name={name} id={name} placeholder={placeholder} type="date" ref={register({ required: isRequired })} onChange={handleValidation} />
		</>
	)
};

export const InputSelect = ({ defaultValue = undefined, name, label, placeholder = '', register = () => {}, isRequired = false, data = [], onChange = null }) => {
	const handleValidation = (e) => {
		if (onChange != null) {
			onChange(e.target.value);
		}
	}

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<select defaultValue={defaultValue} name={name} id={name} ref={register({ required: isRequired })} className="form-select" onChange={handleValidation}>
				<option value="">Seleziona un opzione</option>
				{
					data.map((item, index) => {
						return <option value={item.value} key={index}>{item.name}</option>
					})
				}
			</select>
		</>
	)
};