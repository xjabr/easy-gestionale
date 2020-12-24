import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText, InputNumber, InputEmail, InputTextArea, InputDate } from '../../forms';

const FormCustomer = ({ customer = null, handleSave }) => {
	const [isContractual, setIsContractual] = useState(customer != null ? customer.isContractual : false);
	const [isConjugated, setIsConjugated] = useState(customer != null ? customer.familiares.conjugated : false);

	const [firstNameConj, setFirstNameConj] = useState(undefined);
	const [lastNameConj, setLastNameConj] = useState(undefined);
	const [cfConj, setCfConj] = useState(undefined);
	const [emailConj, setEmailConj] = useState(undefined);
	const [professionConj, setProfessionConj] = useState(undefined);
	const [dateBirthConj, setDateBirthConj] = useState(undefined);
	const [noteConj, setNoteConj] = useState(undefined);

	const { register, handleSubmit } = useForm({});

	const onSubmit = async (data) => {
		let obj = data;

		// fix 
		for (var p in obj) {
			if (obj[p] === '') {
				obj[p] = undefined;
			}
		}

		if (isContractual) {
			obj = {
				...obj,
				familiares: {
					conjugated: isConjugated,
					first_name: firstNameConj,
					last_name: lastNameConj,
					datebirth: dateBirthConj,
					cf: cfConj,
					email: emailConj,
					conjugatedprofession: professionConj,
					note: noteConj
				}
			}
		}

		await handleSave(obj);
	}

	return (
		<form className="margin-40" onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor="isContractual" className="mb-2"><input type="checkbox" name="isContractual" id="isContractual" ref={register} defaultChecked={isContractual} onChange={() => setIsContractual(!isContractual)} /> <span className="mx-2"> Cliente Contrattualizzato?</span></label>

			<div className="row mb-3">
				<div className="col-md-6">
					<InputText defaultValue={customer == null ? '' : customer.first_name} name="first_name" label="Nome" register={register} isRequired={true} />
				</div>
				<div className="col-md-6">
					<InputText defaultValue={customer == null ? '' : customer.last_name} name="last_name" label="Cognome" register={register} isRequired={true} />
				</div>
			</div>

			<div className="row">
				<div className="col-md-6">
					<InputEmail defaultValue={customer == null ? '' : customer.email} name="email" label="Email" register={register} isRequired={true} />
				</div>
				<div className="col-md-6">
					<InputNumber defaultValue={customer == null ? '' : customer.phone} name="phone" validation={/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/} label="Numero di Telefono" register={register} isRequired={true} />
				</div>
			</div>

			{isContractual ?
				<>
					<hr className="my-4" />

					<div className="row mb-3">
						<div className="col-md-6">
							<InputDate defaultValue={customer == null ? '' : customer.datebirth} name="datebirth" label="Data di Nascita" register={register} />
						</div>
						<div className="col-md-6">
							<InputText defaultValue={customer == null ? '' : customer.citybirth} name="citybirth" label="Luogo di Nascita" register={register} />
						</div>
					</div>

					<div className="row mb-3">
						<div className="col-md-4">
							<InputText defaultValue={customer == null ? '' : customer.cf} name="cf" label="Codice Fiscale" register={register} validation={/^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/} />
						</div>
						<div className="col-md-4">
							<InputText defaultValue={customer == null ? '' : customer.piva} name="piva" validation={/^[0-9]{11}$/} label="Partita IVA" register={register} />
						</div>
						<div className="col-md-4">
							<InputText defaultValue={customer == null ? '' : customer.profession} name="profession" label="Professione" register={register} />
						</div>
					</div>

					<div className="row mb-3">
						<div className="col-md-6">
							<InputText defaultValue={customer == null ? '' : customer.address} name="address" label="Indirizzo" register={register} />
						</div>
						<div className="col-md-6">
							<InputText defaultValue={customer == null ? '' : customer.postcode} name="postcode" label="CAP" register={register} />
						</div>
					</div>

					<div className="row mb-3">
						<div className="col-md-6">
							<InputText defaultValue={customer == null ? '' : customer.city} name="city" label="Città" register={register} />
						</div>
						<div className="col-md-6">
							<InputText defaultValue={customer == null ? '' : customer.prov} name="prov" label="Provincia" register={register} />
						</div>
					</div>

					<InputTextArea defaultValue={customer == null ? '' : customer.note} name="note" label="Note" register={register} />

					<hr className="my-4" />

					<label htmlFor="is-conjugated" className="mb-2"><input type="checkbox" name="is-conjugated" id="is-conjugated" defaultChecked={isConjugated} onChange={() => setIsConjugated(!isConjugated)} /> <span className="mx-2"> Coniugato?</span></label>

					{
						isConjugated ?
							<>
								<div className="row mb-3">
									<div className="col-md-4">
										<InputText defaultValue={customer == null ? '' : customer.familiares.first_name} ame="firstNameConj" label="Nome" onChange={setFirstNameConj} />
									</div>
									<div className="col-md-4">
										<InputText defaultValue={customer == null ? '' : customer.familiares.last_name} name="lastNameConj" label="Cognome" onChange={setLastNameConj} />
									</div>
									<div className="col-md-4">
										<InputDate defaultValue={customer == null ? '' : customer.familiares.datebirth} name="datebirthConj" label="Data di Nascita" onChange={setDateBirthConj} />
									</div>
								</div>

								<div className="row">
									<div className="col-md-4">
										<InputText defaultValue={customer == null ? '' : customer.familiares.cf} name="cfConj" label="Codice Fiscale" onChange={setCfConj} validation={/^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/} />
									</div>
									<div className="col-md-4">
										<InputEmail defaultValue={customer == null ? '' : customer.familiares.email} name="emailConj" label="Email" onChange={setEmailConj} />
									</div>
									<div className="col-md-4">
										<InputText defaultValue={customer == null ? '' : customer.familiares.profession} name="professionConj" label="Professione" onChange={setProfessionConj} />
									</div>
								</div>

								<InputTextArea defaultValue={customer == null ? '' : customer.familiares.note} name="noteConj" label="Note" onChange={setNoteConj} />
							</>
							: null
					}

					<hr className="my-4" />

					<div className="row mb-3">
						<div className="col-md-3">
							<InputText defaultValue={customer == null ? '' : customer.prevRedd} name="prevRedd" label="Previsione Reddito" register={register} />
						</div>
						<div className="col-md-3">
							<InputNumber defaultValue={customer == null ? '' : customer.patrimony} name="patrimony" label="Patrimonio" register={register} />
						</div>
						<div className="col-md-3">
							<InputText defaultValue={customer == null ? '' : customer.monthlyCommitments} name="monthlyCommitments" label="Impegni Mensili" register={register} />
						</div>
						<div className="col-md-3">
							<label className="d-block" >&nbsp;</label>
							<label htmlFor="homeOwned" className="mb-2"><input type="checkbox" defaultChecked={customer == null ? false : customer.homeOwned} name="homeOwned" id="homeOwned" ref={register} /> <span className="mx-2"> Case di proprietà?</span></label>
						</div>
					</div>

					<div className="row mb-3">
						<div className="col-md-3">
							<InputNumber defaultValue={customer == null ? '' : customer.monthlyIncome} name="monthlyIncome" label="Reddito Mensile" register={register} />
						</div>
						<div className="col-md-3">
							<label className="d-block" >&nbsp;</label>
							<label htmlFor="lifePolicies" className="mb-2"><input type="checkbox" defaultChecked={customer == null ? false : customer.lifePolicies} name="lifePolicies" id="lifePolicies" ref={register} /> <span className="mx-2"> Polizze Vita?</span></label>
						</div>
						<div className="col-md-3">
							<InputText defaultValue={customer == null ? '' : customer.btp} name="btp" label="BTP" register={register} />
						</div>
						<div className="col-md-3">
							<InputText defaultValue={customer == null ? '' : customer.bonds} name="bonds" label="Obbligazioni" register={register} />
						</div>
					</div>

					<div className="row mb-3">
						<div className="col-md-6">
							<InputText defaultValue={customer == null ? '' : customer.actions} name="actions" label="Azioni" register={register} />
						</div>
						<div className="col-md-6">
							<InputText defaultValue={customer == null ? '' : customer.bankAccount} name="bankAccount" label="Conto Corrente" register={register} />
						</div>
					</div>

					<div className="row mb-3">
						<div className="col-md-3">
							<label className="d-block" >&nbsp;</label>
							<label htmlFor="accidentPolicies" className="mb-2"><input type="checkbox" defaultChecked={customer == null ? false : customer.accidentPolicies} name="accidentPolicies" id="accidentPolicies" ref={register} /> <span className="mx-2"> Polizza Infortuni?</span></label>
						</div>
						<div className="col-md-3">
							<label className="d-block" >&nbsp;</label>
							<label htmlFor="housePolicies" className="mb-2"><input type="checkbox" defaultChecked={customer == null ? false : customer.housePolicies} name="housePolicies" id="housePolicies" ref={register} /> <span className="mx-2"> Polizza Casa?</span></label>
						</div>
						<div className="col-md-3">
							<label className="d-block" >&nbsp;</label>
							<label htmlFor="healthPolicies" className="mb-2"><input type="checkbox" defaultChecked={customer == null ? false : customer.healthPolicies} name="healthPolicies" id="healthPolicies" ref={register} /> <span className="mx-2"> Polizza Sanitaria?</span></label>
						</div>
						<div className="col-md-3">
							<label className="d-block" >&nbsp;</label>
							<label htmlFor="professionalPolicies" className="mb-2"><input type="checkbox" defaultChecked={customer == null ? false : customer.professionalPolicies} name="professionalPolicies" id="professionalPolicies" ref={register} /> <span className="mx-2"> Polizza Professionale?</span></label>
						</div>
					</div>
				</>
				: null}

			<hr />

			<input type="submit" className="btn btn-primary" value="Conferma" />
		</form>
	)
}

export default FormCustomer;