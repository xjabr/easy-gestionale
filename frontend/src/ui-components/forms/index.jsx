import React, { useEffect, useState } from 'react';
import moment from 'moment';

export const InputText = ({ style = {}, bold = false, className = '', disabled = false, defaultValue = undefined, name, label, placeholder = '', register = () => { }, isRequired = false, validation = null, onChange = null, type = 'text' }) => {
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
		<div>
			<label className={bold ? 'fw-bold' : 'fw-normal'} htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
			<input style={style} defaultValue={defaultValue} disabled={disabled} className={error ? 'form-control form-error-input ' + className : 'form-control ' + className} name={name} id={name} {...register(name, { required: isRequired })} placeholder={placeholder} type={type} onChange={handleValidation} />
			<span className="errors" id={`error_${name}`}></span>
		</div>
	)
};

export const InputEmail = ({ style = {}, disabled = false, defaultValue = undefined, name, label, placeholder = '', register = () => { }, isRequired = false, validation = /^(([^<div>()[\].,;:\s@"]+(\.[^<div>()[\].,;:\s@"]+)*)|(".+"))@(([^<div>()[\].,;:\s@"]+\.)+[^<div>()[\].,;:\s@"]{2,})$/i, onChange = null }) => {
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
		<div>
			<label htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
			<input style={style} defaultValue={defaultValue} disabled={disabled} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} {...register(name, { required: isRequired })} placeholder={placeholder} type="email" onChange={handleValidation} />
			<span className="errors" id={`error_${name}`}></span>
		</div>
	)
};

export const InputNumber = ({ withSubmit = false, onSubmit = () => { }, price = false, bold = false, style = {}, disabled = false, value = undefined, defaultValue = undefined, name, step = '1', type = 'text', label, placeholder = '', register = () => { }, isRequired = false, validation = /^[0-9]+$/, onChange = null }) => {
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

	const handleSubmit = (e) => {
		e.preventDefault();

		const value = document.getElementById(name).value;
		onSubmit(value);
	}

	if (!price && !withSubmit) {
		return (
			<div>
				<label className={bold ? 'fw-bold mt-0' : 'fw-normal'} htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
				<input style={style} defaultValue={defaultValue} disabled={disabled} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} {...register(name, { required: isRequired })} placeholder={placeholder} type={type} step={type !== 'number' ? null : step} onChange={handleValidation} />
				<span className="errors" id={`error_${name}`}></span>
			</div>
		)
	}

	if (withSubmit) {
		return (
			<div>
				<label className={bold ? 'fw-bold mt-0' : 'fw-normal'} htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
				<div className="input-group flex-nowrap">
					<input style={style} defaultValue={defaultValue} value={value} disabled={disabled} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} {...register(name, { required: isRequired })} placeholder={placeholder} type={type} step={type !== 'number' ? null : step} onChange={handleValidation} />
					<input className="btn btn-primary" type="button" value="Applica" onClick={handleSubmit} />
					<span className="errors" id={`error_${name}`}></span>
				</div>
			</div>
		)
	}

	if (price) {
		return (
			<div>
				<label className={bold ? 'fw-bold mt-0' : 'fw-normal'} htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
				<div className="input-group flex-nowrap">
					<span className="input-group-text">&euro;</span>
					<input style={style} defaultValue={defaultValue} value={value} disabled={disabled} className={error ? 'form-control form-error-input' : 'form-control'} name={name} id={name} {...register(name, { required: isRequired })} placeholder={placeholder} type={type} step={type !== 'number' ? null : step} onChange={handleValidation} />
					<span className="errors" id={`error_${name}`}></span>
				</div>
			</div>
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
		<div>
			<label htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
			<textarea style={style} defaultValue={defaultValue} disabled={disabled} className={error ? 'form-control form-error-input ' + className : 'form-control ' + className} name={name} id={name} {...register(name, { required: isRequired })} placeholder={placeholder} onChange={handleValidation}></textarea>
			<span className="errors" id={`error_${name}`}></span>
		</div>
	)
};


export const InputDate = ({ withSubmit = false, onSubmit = () => { }, style = {}, disabled = false, defaultValue = undefined, name, label, placeholder = '', register = () => { }, value = undefined, isRequired = false, onChange = null }) => {
	const handleValidation = (e) => {
		if (onChange !== null) {
			onChange(e.target.value);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const value = document.getElementById(name).value;
		onSubmit(value);
	}

	if (!withSubmit) {
		return (
			<div>
				<label htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
				<input style={style} defaultValue={moment(defaultValue).format('YYYY-MM-DD')} disabled={disabled} className={'form-control'} name={name} id={name} placeholder={placeholder} type="date" {...register(name, { required: isRequired })} onChange={handleValidation} />
				<span className="errors" id={`error_${name}`}></span>
			</div>
		)
	}

	if (withSubmit) {
		return (
			<div>
				<label htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
				<div className="input-group flex-nowrap">
					<input style={style} defaultValue={moment(defaultValue).format('YYYY-MM-DD')} disabled={disabled} className={'form-control'} name={name} id={name} placeholder={placeholder} type="date" {...register(name, { required: isRequired })} onChange={handleValidation} />
					<input className="btn btn-primary" type="button" value="Applica" onClick={handleSubmit} />
					<span className="errors" id={`error_${name}`}></span>
				</div>
			</div>
		)
	}
};

export const InputSelect = ({ style = {}, bold = false, className = '', disabled = false, defaultValue = undefined, name, label, placeholder = 'Seleziona un\'opzione', register = () => { }, isRequired = false, data = [], onChange = null }) => {
	const handleValidation = (e) => {
		if (onChange !== null) {
			onChange(e.target.value === '' ? undefined : e.target.value);
		}
	}

	useEffect(() => {
		if (defaultValue !== undefined && defaultValue !== null) {
			document.getElementById(name).value = defaultValue;
		}
	}, [name, defaultValue]);

	// TODO Replace with Select components and apis react-select

	// const styles = {
	// 	menuPortal: (styles) => {
	// 		return {
	// 			...styles,
	// 			zIndex: 99999
	// 		}
	// 	},
	// 	menu: (styles) => {
	// 		return {
	// 			...styles,
	// 			zIndex: 99999
	// 		}
	// 	}
	// }

	return (
		<div>
			<label className={bold ? 'fw-bold mt-0' : 'fw-normal'} htmlFor={name}>{label} {isRequired ? <span className="required">*</span> : null}</label>
			<select style={style} defaultValue={defaultValue} disabled={disabled} name={name} id={name} {...register(name, { required: isRequired })} className={'form-select ' + className} onChange={handleValidation}>
				<option value="">{placeholder}</option>
				{
					data.map((item, index) => {
						return <option value={item.value} key={index}>{item.label}</option>
					})
				}
			</select>
			<span className="errors" id={`error_${name}`}></span>
			{/* <Select
				options={data}
				inputId={name}
				styles={styles}
				defaultValue={data.filter(item => item.value === defaultValue)}
				isDisabled={disabled}
				name={name}
				id={name}
				ref={register}
				onChange={handleValidation} /> */}
		</div>
	)
};