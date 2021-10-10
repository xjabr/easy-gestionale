import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputText, InputNumber, InputDate, InputTextArea, InputSelect } from '../../forms';
import { useInvoice } from '../../../contexts/invoice-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { number_format } from '../../../utils';

const FormAnagraphic = ({ newNr = null, invoice = null, handleSave, type = 'CLIENTE' }) => {
	const { register, handleSubmit } = useForm({});

	const { getAnagraphicsForInvoice, getVatCodes } = useInvoice();

	const [anagraphics, setAnagraphics] = useState(null);
	const [vatCodes, setVatCodes] = useState([]);
	const [services, setServices] = useState(invoice !== null ? invoice.services : []);

	const [nameService, setNameService] = useState("");
	const [descriptionService, setDescriptionService] = useState("");
	const [qtaService, setQtaService] = useState(0);
	const [priceService, setPriceService] = useState(0);
	const [vatCodeService, setVatCodeService] = useState(0);
	const [discount, setDiscount] = useState(invoice === null ? 0 : invoice.discount);
	const [otherTax, setOtherTax] = useState(invoice === null ? 0 : invoice.other_taxes);

	const [totalDoc, setTotalDoc] = useState(invoice === null ? 0 : invoice.total)
	const [totalDocIva, setTotalDocIva] = useState(invoice === null ? 0 : invoice.total)
	const [total, setTotal] = useState(invoice === null ? 0 : invoice.total)

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
			const { data, error } = await getAnagraphicsForInvoice(type === 'CLIENTE' ? 'CUSTOMER' : 'SUPPLIER');

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
	}, [getAnagraphicsForInvoice, getVatCodes, type]);

	const onSubmit = async (data) => {
		data = {
			...data,
			type,
			services: services,
			tot_document: totalDoc,
			tot_iva: totalDocIva,
			tot: total
		};

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

		let _otherTax = isNaN(otherTax) ? 0 : parseFloat(otherTax)
		let _discount = isNaN(discount) ? 0 : parseFloat(discount)

		let total = (totalDoc + totalDocIva + _otherTax) - _discount;

		setTotalDoc(totalDoc);
		setTotalDocIva(totalDocIva);
		setTotal(total);
	}, [discount, otherTax, services]);

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
		{ value: 'FATTURA', label: 'FATTURA' },
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
					<InputSelect defaultValue={invoice === null ? '' : invoice.type_document} data={type_document} label="Tipo Documento" name="type_document" register={register} isRequired={true} />
				</div>
				<div className="col-md-3">
					<InputNumber defaultValue={invoice === null ? newNr : invoice.nr_document} label="Nr. Documento" name="nr_document" register={register} isRequired={true} />
				</div>
				<div className="col-md-3">
					<InputDate defaultValue={invoice === null ? '' : invoice.date_document} label="Data Documento" name="date_document" register={register} isRequired={true} />
				</div>
				<div className="col-md-3">
					{
						anagraphics !== null ?
							<InputSelect defaultValue={invoice === null ? '' : invoice.anagraphic_id} data={anagraphics} label={type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} name="anagraphic_id" register={register} isRequired={true} />
							: null
					}
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-md-3">
					<InputSelect defaultValue={invoice === null ? '' : invoice.payment_method} data={payment_method} label="Metodo di Pagamento" name="payment_method" register={register} isRequired={true} />
				</div>
				<div className="col-md-3">
					<InputText defaultValue={invoice === null ? '' : invoice.bank} label="Banca" name="bank" register={register} isRequired={false} />
				</div>
				<div className="col-md-6">
					<InputText defaultValue={invoice === null ? '' : invoice.iban} label="IBAN" name="iban" register={register} isRequired={false} />
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-md-3">
					<InputNumber price={true} type="number" defaultValue={invoice === null ? 0 : invoice.discount} onChange={setDiscount} label="Sconto" name="discount" register={register} isRequired={false} />
				</div>
				<div className="col-md-3">
					<InputNumber price={true} type="number" defaultValue={invoice === null ? 0 : invoice.other_taxes} onChange={setOtherTax} label="Altre Tasse" name="other_taxes" register={register} isRequired={false} />
				</div>
			</div>

			<InputTextArea defaultValue={invoice === null ? '' : invoice.note} name="note" label="Note" register={register} isRequired={false} />

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
						<th>Tasse Extra</th>
						<td>&euro; {number_format(otherTax, 2, ',', '.')}</td>
					</tr>
					<tr>
						<th>Totale Documento</th>
						<td>&euro; {number_format(totalDoc, 2, ',', '.')}</td>
					</tr>
					<tr>
						<th>Totale IVA</th>
						<td>&euro; {number_format(totalDocIva, 2, ',', '.')}</td>
					</tr>
					<tr>
						<th>Totale Lordo</th>
						<td>&euro; {number_format(total, 2, ',', '.')}</td>
					</tr>
					{
						type === 'CLIENTE' ?
						<>
							<tr>
								<th>Tasse da pagare* (NB: Le tasse e contributi che dovrai versare)</th>
								<td>&euro; {number_format((total * 0.78 * 0.05) + (total * 0.78 * 0.2572), 2, ',', '.')}</td>
							</tr>
						</>
						: null
					}
				</tbody>
			</table>

			<hr />

			<input type="submit" className="btn btn-primary" value="Conferma" />
		</form>
	)
}

export default FormAnagraphic;