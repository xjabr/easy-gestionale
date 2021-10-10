import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { AnagraphicProvider } from '../../../contexts/anagraphic-context';
import { useInvoice } from '../../../contexts/invoice-context';
import FormInvoice from '../../../ui-components/forms-components/invoice';
import InvoicePdf from '../../../ui-components/pdfs/invoices-pdf';

const EditInvoice = (props) => {
	const { id } = props.match.params;
	const { updateInvoice, getSingleInvoice } = useInvoice();

	const [invoice, setInvoice] = useState(null);

	const pdfTarget = useRef();


	useEffect(() => {
		const getInvoice = async () => {
			const { data, error } = await getSingleInvoice(id);

			if (error !== null) {
				return window.location.href = '/fatture-vendita';
			}

			setInvoice(data);
		}

		getInvoice();
	}, [getSingleInvoice, id])

	const onSubmit = async (form) => {
		const { error } = await updateInvoice(id, form);

		if (error !== null) return alert(`Errore`);

		window.location.reload();
	}

	return (
		<div className="invoice-customer-edit">
			<div className="top-page">
				<h3 className="top-page-title">Modifica Documento</h3>
			</div>

			<hr />

			{invoice !== null ?
				<>
					<ReactToPrint
						trigger={() => (
							<button className="btn btn-primary">Download Fattura PDF</button>
						)}
						content={() => pdfTarget.current}
					/>

					<div className="d-none">
						<AnagraphicProvider>
							<InvoicePdf invoice={invoice} targetRef={pdfTarget} ref={pdfTarget} />
						</AnagraphicProvider>
					</div>

					<hr />

					<FormInvoice invoice={invoice} handleSave={onSubmit} type="CLIENTE" />
				</>
				: <p>Caricamento risorse...</p>}
		</div >
	)
}

export default EditInvoice;