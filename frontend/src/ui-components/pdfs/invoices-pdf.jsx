import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/auth-context';
import { useAnagraphic } from '../../contexts/anagraphic-context';

import { number_format } from '../../utils';

const InvoicePdf = ({ invoice, targetRef }) => {
	const { getMyInfo } = useAuth();
	const { getSingleAnagraphic } = useAnagraphic();

	const [org, setOrg] = useState(null);
	const [user, setUser] = useState(null);
	const [other, setOther] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const data = await getMyInfo();
			setOrg(data.organization)
			setUser(data.user)
		}

		const fetchOtherData = async () => {
			const { data, error } = await getSingleAnagraphic(invoice.anagraphic_id);
			if (error !== null) return alert(error.response.data.description);
			setOther(data);
		}

		fetchUserData();
		fetchOtherData();
	}, [getSingleAnagraphic, getMyInfo, invoice]);

	return (
		<div className="container-invoice" style={{ padding: 50 }} ref={targetRef}>
			{
				org !== null && user !== null && other !== null ?
					<>
						{/* header */}
						<div className="invoice-header">
							<h1>{org.name_org}</h1>
							<h2>FATTURA N. {invoice.nr_document}/{moment(invoice.date_document).year()}</h2>
							<p>Email: {user.email} - Indirizzo: {org.address}, {org.cap}, {org.city} - Nazione: {org.country} - P.IVA: {org.p_iva} </p>
						</div>

						<hr />

						<div className="invoice-middle">
							<div style={{ columns: '2 auto' }}>
								<div style={{ width: '100%' }}>
									<h3>Azienda</h3>
									<p>Rag. Sociale: {org.name_org}</p>
									<p>Indirizzo: {org.address}, {org.cap}, {org.city}</p>
									<p>Nazione: {org.country}</p>
									<p>Email: {user.email}</p>
									<p>Partita IVA: {org.p_iva}</p>
									<p>Codice Fiscale: {org.cf}</p>
									<p>PEC: {org.pec !== '' && org.pec !== null ? org.pec : 'n/a'}</p>
									<p>Codice destinatario: {org.cod_desti !== '' && org.cod_desti !== null ? org.cod_desti : 'n/a'}</p>
								</div>
								<div style={{ width: '100%' }}>
									<h3>{other.type === 'CUSTOMER' ? 'Cliente' : 'Fornitore'}</h3>
									<p>Rag. Sociale: {other.first_name}</p>
									<p>Indirizzo: {other.address}, {other.cap}, {other.city}</p>
									<p>Nazione: {other.country}</p>
									<p>Email: {other.email}</p>
									<p>Partita IVA: {other.p_iva}</p>
									<p>Codice Fiscale: {other.cf}</p>
									<p>PEC: {other.pec !== '' && other.pec !== null ? other.pec : 'n/a'}</p>
									<p>Codice destinatario: {other.cod_desti !== '' && other.cod_desti !== null ? other.cod_desti : 'n/a'}</p>
								</div>
							</div>
						</div>

						<hr />

						<div className="invoice-services">
							<h4>Servizi</h4>

							{invoice.services.length > 0 ?
								<>
									<table className="table table-striped">
										<thead className="thead-dark">
											<tr>
												<th>Nome</th>
												<th>Descrizione</th>
												<th>Quantità</th>
												<th style={{ width: '100px' }}>Prezzo</th>
												<th style={{ width: '100px' }}>IVA</th>
												<th style={{ width: '100px' }}>Totale</th>
											</tr>
										</thead>
										<tbody>
											{
												invoice.services.map((item, index) => {
													return (
														<tr key={index}>
															<td style={{ fontSize: 12 }}>{item.name}</td>
															<td style={{ fontSize: 12 }}>{item.description}</td>
															<td style={{ fontSize: 12 }}>{item.qta}</td>
															<td style={{ fontSize: 12 }}>&euro; {number_format(item.price, 2, ',', '.')}</td>
															<td style={{ fontSize: 12 }}>{item.vatCode.label}</td>
															<td style={{ fontSize: 12 }}>&euro; {number_format(item.total, 2, ',', '.')}</td>
														</tr>
													)
												})
											}
										</tbody>
									</table>
								</>
								: null}


							<hr />

							<h4>Note</h4>
							<p>{invoice.note ? invoice.note : 'N/A'}</p>
						</div>

						<hr />
						<div className="invoice-summary">
							<div style={{ columns: '2 auto' }}>
								<div style={{ width: '100%' }}>
									<h4>Mod. Pagamento - {invoice.payment_method}</h4>
									{
										invoice.payment_method === 'BONIFICO' ?
										<>
											<p>Banca: <strong>{invoice.bank === '' || invoice.bank === null ? org.bank : invoice.bank}</strong></p>
											<p>IBAN: <strong>{invoice.iban === '' || invoice.iban === null ? org.iban : invoice.iban}</strong></p>
										</>
										:
										<>
											<p>Contatta <strong>{user.email}</strong> per maggior info.</p>
										</>
									}
								</div>
								<div style={{ width: '100%' }}>
									<h4>Scadenze</h4>
									<p><strong>{moment(invoice.date_document).add(7, 'days').format('DD/MM/YYYY')}</strong>: &euro; {number_format(invoice.tot, 2, ',', '.')}</p>
								</div>
							</div>

							<hr />
							<div className="table-contianer">
								<h4>Resoconto</h4>
								<table className="table table-striped w-100">
									<tbody>
										<tr>
											<th style={{ width: '50%' }}>Sconto</th>
											<td>&euro; {number_format(invoice.discount, 2, ',', '.')}</td>
										</tr>
										<tr>
											<th style={{ width: '50%' }}>Tasse Extra</th>
											<td>&euro; {number_format(invoice.other_taxes, 2, ',', '.')}</td>
										</tr>
										<tr>
											<th style={{ width: '50%' }}>Totale Documento</th>
											<td>&euro; {number_format(invoice.tot_document, 2, ',', '.')}</td>
										</tr>
										<tr>
											<th style={{ width: '50%' }}>Totale IVA</th>
											<td>&euro; {number_format(invoice.tot_iva, 2, ',', '.')}</td>
										</tr>
										<tr>
											<th style={{ width: '50%' }}>Totale Lordo</th>
											<td>&euro; {number_format(invoice.tot, 2, ',', '.')}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</>
					: null
			}
		</div >
	)


}

export default InvoicePdf;