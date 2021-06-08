import React, { useEffect, useState } from 'react';
import moment from 'moment';

export const InputText = ({ style = {}, className = '', disabled = false, defaultValue = undefined, name, label, placeholder = '', register = () => { }, isRequired = false, validation = null, onChange = null, type = 'text' }) => {
	const [error, setError] = useState(false);

	const handleValidation = (e) => {
		let value = String(e.target.value);

		if (onChange !== null) {
			onChange(e.target.value);
		}

		if (validation === null) {
			return
		}

		if (value.match(validation) || value.length < 1) {
			setError(false);
			return;
		}

		setError(true);
	}

	return (
		<>
			<label className="fw-bold" htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
			<input style={style} defaultValue={defaultValue} disabled={disabled} className={error ? 'form-control form-error-input ' + className : 'form-control ' + className} name={name} id={name} ref={register({ required: isRequired })} placeholder={placeholder} type={type} onChange={handleValidation} />
		</>
	)
};

export const InputEmail = ({ style = {}, disabled = false, defaultValue = undefined, name, label, placeholder = '', register = () => { }, isRequired = false, validation = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, onChange = null }) => {
	const [error, setError] = useState(false);

	const handleValidation = (e) => {
		let value = String(e.target.value);

		if (onChange !== null) {
			onChange(e.target.value);
		}

		if (validation === null) {
			return;
		}

		if (value.match(validation) || value.length < 1) {
			setError(false);
			return;
		}

		setError(true);
	}

	return (
		<>
			<label className="fw-bold" htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
			<input style={style} defaultValue={defaultValue} disabled={disabled} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} ref={register({ required: isRequired })} placeholder={placeholder} type="email" onChange={handleValidation} />
		</>
	)
};

export const InputNumber = ({ price = false, style = {}, disabled = false, value = undefined, defaultValue = undefined, name, step = '1', type = 'text', label, placeholder = '', register = () => { }, isRequired = false, validation = /^[0-9]+$/, onChange = null }) => {
	const [error, setError] = useState(false);

	const handleValidation = (e) => {
		let value = String(e.target.value);

		if (onChange !== null) {
			onChange(e.target.value);
		}

		if (validation === null) {
			return;
		}

		if (value.match(validation) || value.length < 1) {
			setError(false);
			return;
		}

		setError(true);
	}

	if (!price) {
		return (
			<>
				<label className="fw-bold" htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
				<input style={style} defaultValue={defaultValue} disabled={disabled} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} ref={register({ required: isRequired })} placeholder={placeholder} type={type} step={type !== 'number' ? null : step} onChange={handleValidation} />
			</>
		)
	} else {
		return (
			<>
				<label className="fw-bold" htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
				<div className="input-group flex-nowrap">
					<span className="input-group-text">&euro;</span>
					<input style={style} defaultValue={defaultValue} value={value} disabled={disabled} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} ref={register({ required: isRequired })} placeholder={placeholder} type={type} step={type !== 'number' ? null : step} onChange={handleValidation} />
				</div>
			</>
		)
	}
};

export const InputTextArea = ({ style = {}, className = '', disabled = false, defaultValue = undefined, name, label, placeholder = '', register = () => { }, isRequired = false, validation = null, onChange = null }) => {
	const [error, setError] = useState(false);

	const handleValidation = (e) => {
		let value = String(e.target.value);

		if (onChange !== null) {
			onChange(e.target.value);
		}

		if (validation === null) {
			return;
		}

		if (value.match(validation) || value.length < 1) {
			setError(false);
			return;
		}

		setError(true);
	}

	return (
		<>
			<label className="fw-bold" htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
			<textarea style={style} defaultValue={defaultValue} disabled={disabled} className={error ? 'form-control form-error-input ' + className : 'form-control ' + className} name={name} id={name} ref={register({ required: isRequired })} placeholder={placeholder} onChange={handleValidation}></textarea>
		</>
	)
};


export const InputDate = ({ style = {}, disabled = false, defaultValue = undefined, name, label, placeholder = '', register = () => { }, value = undefined, isRequired = false, onChange = null }) => {
	const handleValidation = (e) => {
		if (onChange !== null) {
			onChange(e.target.value);
		}
	}

	return (
		<>
			<label className="fw-bold" htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
			<input style={style} defaultValue={moment(defaultValue).format('YYYY-MM-DD')} disabled={disabled} className={'form-control'} name={name} id={name} placeholder={placeholder} type="date" ref={register({ required: isRequired })} onChange={handleValidation} />
		</>
	)
};

export const InputSelect = ({ isObjVal = false, style = {}, className = '', disabled = false, defaultValue = undefined, name, label, placeholder = 'Seleziona un\'opzione', register = () => { }, isRequired = false, data = [], onChange = null }) => {
	const handleValidation = (e) => {
		if (onChange !== null) {
			if (isObjVal) {
				onChange(e.target.value === '' ? {} : JSON.parse(e.target.value));
			} else {
				onChange(e.target.value === '' ? undefined : e.target.value);
			}
		}
	}

	useEffect(() => {
		if (defaultValue !== undefined && defaultValue !== null) {
			document.getElementById(name).value = defaultValue;
		}
	}, [name, defaultValue]);

	return (
		<>
			<label className="fw-bold" htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
			<select style={style} defaultValue={defaultValue} disabled={disabled} name={name} id={name} ref={register({ required: isRequired })} className={'form-select ' + className} onChange={handleValidation}>
				<option value="">{placeholder}</option>
				{
					data.map((item, index) => {
						return <option value={item.value} key={index}>{item.label}</option>
					})
				}
			</select>
		</>
	)
};