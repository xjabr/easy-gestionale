import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/auth.context';
import { useAnagraphic } from '../../contexts/anagraphic.context';

import { number_format, Padder } from '../../utils';

const QuotePdf = ({ quote, targetRef }) => {
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
			const { data, error } = await getSingleAnagraphic(quote.anagraphic_id);
			if (error !== null) return alert(error.response.data.description);
			setOther(data);
		}

		fetchUserData();
		fetchOtherData();
	}, [getSingleAnagraphic, getMyInfo, quote]);

	return (
		<div className="container-invoice" style={{ padding: 50 }} ref={targetRef}>
			{
				org !== null && user !== null && other !== null ?
					<>
						{/* header */}
						<div className="invoice-header">
							<h1>{org.name_org}</h1>
							<p className="mb-0">{org.address}, {org.cap}, {org.city}</p>
							<p className="mb-0">Codice Fiscale {org.cf}</p>
							<p className="mb-0">Partita Iva {org.p_iva}</p>
							<p className="mb-0">REA: CT</p>
						</div>

						<hr />

						<div className="invoice-middle">
							<div style={{ width: '65%' }}></div>
							<div style={{ width: '35%', float: 'right' }}>
								<h3>Spett.le</h3>
								<p>{other.first_name}</p>
								<p>{other.address}, {other.cap}, {other.city}</p>
								<p>Codice Fiscale: {other.cf}</p>
								<p>Partita IVA: {other.p_iva}</p>
							</div>
						</div>

						<hr />

						<p className="mb-0" style={{ fontSize: 12 }}><strong>PREVENTIVO NR</strong> {new Padder(2).pad(quote.nr_document)}/{moment(quote.date_document).year()} <strong>DEL</strong> {moment(quote.date_document).format('DD/MM/YYYY')}</p>

						<hr />

						<div className="invoice-services">
							{quote.services.length > 0 ?
								<>
									<table className="table table-striped">
										<thead className="thead-dark">
											<tr>
												<th>Descrizione</th>
												<th>Quantità</th>
												<th style={{ width: '100px', textAlign: 'right' }}>Prezzo</th>
												<th style={{ width: '100px' }}>IVA</th>
												<th style={{ width: '100px', textAlign: 'right' }}>Totale</th>
											</tr>
										</thead>
										<tbody>
											{
												quote.services.map((item, index) => {
													return (
														<tr key={index}>
															<td style={{ fontSize: 12 }}>{item.description}</td>
															<td style={{ fontSize: 12 }}>{item.qta}</td>
															<td style={{ fontSize: 12, textAlign: 'right' }}>&euro; {number_format(item.price, 2, ',', '.')}</td>
															<td style={{ fontSize: 12 }}>{item.vatCode.label}</td>
															<td style={{ fontSize: 12, textAlign: 'right' }}>&euro; {number_format(item.total, 2, ',', '.')}</td>
														</tr>
													)
												})
											}
										</tbody>
									</table>
								</>
								: null}

							{
								org.regimeForfettario ?
									<>
										<hr />


										<p style={{ fontSize: 11, fontWeight: 'bold' }} className="mb-0">
											Operazione in franchigia da IVA ai sensi dell’art. 1, commi da 54 a 89 della Legge n. 190/2014 - Regime Forfettario<br />
											Il compenso non è soggetto a ritenute d’acconto ai sensi della legge 190 del 23 Dicembre 2014 art. 1 c.67
										</p>
									</>
									: null
							}
						</div>

						<hr />

						<div className="invoice-summary">
							<div className="table-contianer clearfix">
								<div style={{ width: '50%', float: 'left' }}>
									{
										quote.bollo ?
											<>
												<p className="mb-0"><strong>Bollo su originale:</strong> &euro; 2,00</p>
												<p className="mb-0"><strong>Identificativo:</strong> {quote.idBollo}</p>
											</>
											: null
									}

								</div>
								<div style={{ width: '50%', float: 'left' }}>
									<table className="table table-striped w-100">
										<tbody>
											<tr>
												<th style={{ width: '50%' }}>Sconto</th>
												<td style={{ textAlign: 'right' }}>&euro; {number_format(quote.discount, 2, ',', '.')}</td>
											</tr>
											<tr>
												<th style={{ width: '50%' }}>Imponibile</th>
												<td style={{ textAlign: 'right' }}>&euro; {number_format(quote.tot_document, 2, ',', '.')}</td>
											</tr>
											{
												quote.bollo ?
													<tr>
														<th style={{ width: '50%' }}>Bollo</th>
														<td style={{ textAlign: 'right' }}>&euro; {number_format(2, 2, ',', '.')}</td>
													</tr>
													: null
											}
											<tr>
												<th style={{ width: '50%' }}>IVA</th>
												<td style={{ textAlign: 'right' }}>&euro; {number_format(quote.tot_iva, 2, ',', '.')}</td>
											</tr>
											<tr>
												<th style={{ width: '50%' }}>Totale</th>
												<td style={{ textAlign: 'right' }}>&euro; {number_format(quote.tot, 2, ',', '.')}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</>
					: null
			}
		</div >
	)


}

export default QuotePdf;