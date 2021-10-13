import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useQuote } from '../../../contexts/quote-context';
import { InputText, InputNumber, InputDate, InputTextArea, InputSelect } from '../../forms';
import { number_format } from '../../../utils';

const FormQuote = ({ newNr = null, quote = null, handleSave }) => {
	const { register, handleSubmit } = useForm({});

	const { getAnagraphicsForQuote, getVatCodes } = useQuote();

	const [anagraphics, setAnagraphics] = useState(null);
	const [vatCodes, setVatCodes] = useState([]);
	const [services, setServices] = useState(quote !== null ? quote.services : []);

	const [nameService, setNameService] = useState("");
	const [descriptionService, setDescriptionService] = useState("");
	const [qtaService, setQtaService] = useState(0);
	const [priceService, setPriceService] = useState(0);
	const [vatCodeService, setVatCodeService] = useState(0);
	const [bollo, setBollo] = useState(quote === null ? false : quote.bollo);
	const [discount, setDiscount] = useState(quote === null ? 0 : quote.discount);

	const [totalDoc, setTotalDoc] = useState(quote === null ? 0 : quote.total)
	const [totalDocIva, setTotalDocIva] = useState(quote === null ? 0 : quote.total)
	const [total, setTotal] = useState(quote === null ? 0 : quote.total)

	useEffect(() => {
		const getVatCodesCall = async () => {
			const { data, error } = await getVatCodes();

			if (error !== null) return alert('Impossibile caricare i codici iva.');

			const vatCodesFixed = data.map((item, index) => {
				return {
					inde: index,
					label: item.label,
					value: JSON.stringify(item)
				}
			})

			setVatCodes(vatCodesFixed);
		}

		const getAnagraphics = async () => {
			const { data, error } = await getAnagraphicsForQuote();

			if (error !== null) return alert('Errore');

			const fixedObj = data.map((item, index) => {
				return {
					index: index,
					label: `${item.first_name}`,
					value: item._id
				};
			});

			setAnagraphics(fixedObj);
		}

		getAnagraphics();
		getVatCodesCall();
	}, [getAnagraphicsForQuote, getVatCodes]);

	const onSubmit = async (data) => {
		data = {
			...data,
			services: services,
			tot_document: totalDoc,
			tot_iva: totalDocIva,
			tot: total
		};
		console.log(data);
		await handleSave(data);
	}

	// calc tot doc, tot iva and tot al
	useEffect(() => {
		let totalDoc = 0;
		let totalDocIva = 0;

		services.map((item) => {
			totalDoc += parseFloat(item.qta * item.price);
			totalDocIva += parseFloat(((item.qta * item.price) * item.vatCode.perc) / 100);

			return {};
		});

		let _discount = isNaN(discount) ? 0 : parseFloat(discount)
		let _bollo = bollo ? 2 : 0;
		console.log(_bollo);

		let total = (totalDoc + totalDocIva + _bollo) - _discount;

		setTotalDoc(totalDoc);
		setTotalDocIva(totalDocIva);
		setTotal(total);
	}, [discount, services, bollo]);

	const handleAddService = async () => {
		const obj = {
			name: nameService,
			description: descriptionService,
			qta: qtaService,
			price: priceService,
			vatCode: vatCodeService,
			total: parseFloat((qtaService * priceService) * (1 + vatCodeService.perc / 100)).toFixed(2)
		};

		setServices(oldServices => [...oldServices, obj]);

		// setNameService("");
		// setDescriptionService("");
		// setQtaService(0);
		// setPriceService(0);
		// setVatCodeService(0);
	}

	const handleRemoveService = async (item) => {
		const index = services.indexOf(item);
		setServices(items => items.filter((e, i) => i !== index));
	}

	const type_document = [
		{ value: 'PREVENTIVO', label: 'PREVENTIVO' },
		{ value: 'NOTA CREDITO', label: 'NOTA CREDITO' }
	];

	const payment_method = [
		{ value: 'CONTANTI', label: 'CONTANTI' },
		{ value: 'BONIFICO', label: 'BONIFICO' },
		{ value: 'ASSEGNO', label: 'ASSEGNO' },
		{ value: 'ALTRO', label: 'ALTRO' },
	];

	return (
		<form className="margin-40" onSubmit={handleSubmit(onSubmit)}>
			<div className="row mb-3">
				<div className="col-md-3">
					<InputSelect defaultValue={quote === null ? '' : quote.type_document} data={type_document} label="Tipo Documento" name="type_document" register={register} isRequired={true} />
				</div>
				<div className="col-md-3">
					<InputNumber defaultValue={quote === null ? newNr : quote.nr_document} label="Nr. Documento" name="nr_document" register={register} isRequired={true} />
				</div>
				<div className="col-md-3">
					<InputDate defaultValue={quote === null ? '' : quote.date_document} label="Data Documento" name="date_document" register={register} isRequired={true} />
				</div>
				<div className="col-md-3">
					{
						anagraphics !== null ?
							<InputSelect defaultValue={quote === null ? '' : quote.anagraphic_id} data={anagraphics} label={'Cliente'} name="anagraphic_id" register={register} isRequired={true} />
							: null
					}
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-md-3">
					<InputSelect defaultValue={quote === null ? '' : quote.payment_method} data={payment_method} label="Metodo di Pagamento" name="payment_method" register={register} isRequired={true} />
				</div>
				<div className="col-md-3">
					<InputText defaultValue={quote === null ? '' : quote.bank} label="Banca" name="bank" register={register} isRequired={false} />
				</div>
				<div className="col-md-6">
					<InputText defaultValue={quote === null ? '' : quote.iban} label="IBAN" name="iban" register={register} isRequired={false} />
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-md-3">
					<InputNumber price={true} type="number" defaultValue={quote === null ? 0 : quote.discount} onChange={setDiscount} label="Sconto" name="discount" register={register} isRequired={false} />
				</div>
				<div className="col-md-3">
					<InputText defaultValue={quote === null ? 0 : quote.idBollo} label="Identificativo Bollo" name="idBollo" register={register} isRequired={false} />
				</div>
				<div className="col-md-3">
					<label htmlFor="" className="d-block">&nbsp;</label>
					<label htmlFor="bollo"><input defaultChecked={quote === null ? false : quote.bollo} onClick={() => setBollo(!bollo)} type="checkbox" name="bollo" id="bollo" {...register('bollo', { isRequired: false })} /> Bollo?</label>
				</div>
			</div>

			<InputTextArea defaultValue={quote === null ? '' : quote.note} name="note" label="Note" register={register} isRequired={false} />

			<hr />

			<h4 className="section-title">Servizi</h4>

			<div className="row">
				<div className="col-md-2">
					<InputText label="Nome Servizio" name="service-name" value={nameService} onChange={setNameService} />
				</div>
				<div className="col-md-3">
					<InputText label="Descrizione" name="service-description" value={descriptionService} onChange={setDescriptionService} />
				</div>
				<div className="col-md-1">
					<InputNumber step="1" type="number" label="Quantità" name="service-qta" value={qtaService} onChange={setQtaService} />
				</div>
				<div className="col-md-2">
					<InputNumber price={true} type="number" label="Prezzo" name="service-price" value={priceService} onChange={setPriceService} />
				</div>
				<div className="col-md-2">
					<InputSelect data={vatCodes} label="Codice IVA" name="service-vat-code" value={JSON.stringify(vatCodeService)} onChange={(value) => setVatCodeService(JSON.parse(value))} isObjVal={true} />
				</div>
				<div className="col-md-2">
					<InputNumber price={true} type="number" label="Totale" name="service-total" disabled={true} value={parseFloat((qtaService * priceService) * (1 + vatCodeService.perc / 100)).toFixed(2)} />
				</div>

				<div className="col-md-2 mt-2">
					<button type="button" onClick={handleAddService} className="btn btn-primary btn-block w-100">Aggiungi</button>
				</div>
			</div>

			{ services.length > 0 ?
				<>
					<hr />

					<table className="table table-striped">
						<thead className="thead-dark">
							<tr>
								<th></th>
								<th>Nome Servizio</th>
								<th>Descrizione</th>
								<th>Quantità</th>
								<th>Prezzo</th>
								<th>Codice IVA</th>
								<th>Totale</th>
							</tr>
						</thead>
						<tbody>
							{
								services.map((item, index) => {
									return (
										<tr key={index}>
											<td><button type="button" className="btn btn-danger" onClick={() => handleRemoveService(item)}><FontAwesomeIcon icon={faTrash} /></button></td>
											<td>{item.name}</td>
											<td>{item.description}</td>
											<td>{item.qta}</td>
											<td>&euro; {number_format(item.price, 2, ',', '.')}</td>
											<td>{item.vatCode.label}</td>
											<td>&euro; {number_format(item.total, 2, ',', '.')}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</>
				: null}


			<hr />

			<h4 className="section-title">Resoconto</h4>
			<table className="table table-striped w-50">
				<tbody>
					<tr>
						<th>Sconto</th>
						<td>&euro; {number_format(discount, 2, ',', '.')}</td>
					</tr>
					<tr>
						<th>Imponibile</th>
						<td>&euro; {number_format(totalDoc, 2, ',', '.')}</td>
					</tr>
					<tr>
						<th>IVA</th>
						<td>&euro; {number_format(totalDocIva, 2, ',', '.')}</td>
					</tr>
					<tr>
						<th>Totale</th>
						<td>&euro; {number_format(total, 2, ',', '.')}</td>
					</tr>
				</tbody>
			</table>

			<hr />

			<input type="submit" className="btn btn-primary" value="Conferma" />
		</form>
	)
}

export default FormQuote;