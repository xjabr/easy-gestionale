import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useRouter } from 'next/router';

import { AnagraphicProvider } from '../../contexts/anagraphic.context';
import { useQuote } from '../../contexts/quote.context';
import FormQuote from '../../ui-components/forms-components/quote';
import QuotePdf from '../../ui-components/pdfs/quotes-pdf';
import { useAuth } from '../../contexts/auth.context';

const EditQuote = (props) => {
	const router = useRouter();
	const { id } = router.query;

	const { isLoggedIn } = useAuth();
	const { updateQuote, getSingleQuote } = useQuote();

	const [quote, setQuote] = useState(null);

	const pdfTarget = useRef();

	useEffect(() => {
		if (!isLoggedIn || id === undefined) return ;

		const getQuote = async () => {
			const { data, error } = await getSingleQuote(id);

			if (error !== null) {
				return window.location.href = '/quotes';
			}

			setQuote(data);
		}

		getQuote();
	}, [isLoggedIn, getSingleQuote, id])

	const onSubmit = async (form) => {
		const { error } = await updateQuote(id, form);

		if (error !== null) return alert(`Errore`);

		window.location.reload();
	}

	return (
		<div className="Quote-customer-edit">
			<div className="top-page">
				<h3 className="top-page-title">Modifica Documento</h3>
			</div>

			<hr />

			{quote !== null ?
				<>
					<ReactToPrint
						trigger={() => (
							<button className="btn btn-primary">Download Preventivo PDF</button>
						)}
						content={() => pdfTarget.current}
					/>

					<div className="d-none">
						<AnagraphicProvider>
							<QuotePdf quote={quote} targetRef={pdfTarget} />
						</AnagraphicProvider>
					</div>

					<hr />

					<FormQuote quote={quote} handleSave={onSubmit} />
				</>
				: <p>Caricamento risorse...</p>}
		</div >
	)
}

export default EditQuote;