import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useRouter } from 'next/router';

import { AnagraphicProvider } from '../../../contexts/anagraphic.context';
import { useInvoice } from '../../../contexts/invoice.context';
import FormInvoice from '../../../ui-components/forms-components/invoice';
import InvoicePdf from '../../../ui-components/pdfs/invoices-pdf';
import { useAuth } from '../../../contexts/auth.context';

const EditInvoiceSupplier = (props) => {
	const router = useRouter();
	const { id } = router.query;

	const { isLoggedIn } = useAuth();
	const { updateInvoice, getSingleInvoice } = useInvoice();

	const [invoice, setInvoice] = useState(null);

	const pdfTarget = useRef();

	useEffect(() => {
		if (!isLoggedIn || id === undefined) return ;

		const getInvoice = async () => {
			const { data, error } = await getSingleInvoice(id);

			if (error !== null) {
				return window.location.href = '/invoices/suppliers';
			}

			setInvoice(data);
		}

		getInvoice();
	}, [isLoggedIn, getSingleInvoice, id])

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

					<FormInvoice invoice={invoice} handleSave={onSubmit} type="FORNITORE" />
				</>
				: <p>Caricamento risorse...</p>}

		</div>
	)
}

export default EditInvoiceSupplier;