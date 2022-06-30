import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Chart } from 'react-google-charts';

import { useAuth } from '../contexts/auth.context';
import { useInvoice } from '../contexts/invoice.context';
import { number_format } from '../utils';
import { getPercByAteco } from '../utils/ateco-codes';

const Home = () => {
	const router = useRouter();

	const { user, isLoggedIn, ateco } = useAuth();
	const { analysisCustomerInvoices } = useInvoice();

	const [data, setData] = useState(null);
	const [year, setYear] = useState(new Date().getFullYear());

	useEffect(() => {
		if (!isLoggedIn) {
			// router.push('/login');
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (!isLoggedIn) return ;

		const fetchAnalysisCustomerInvoice = async () => {
			const { data, error } = await analysisCustomerInvoices({ year });
			if (error !== null) return alert(error.response.data.description);
			setData(data);
		}

		fetchAnalysisCustomerInvoice();
	}, [year, isLoggedIn]);

	return (
		<div className="dashboard-component">
			{
				user !== null && data !== null ?
					<>
						<h4 className="section-title">Benvenuto {`${user.user.first_name} ${user.user.last_name}`}</h4>

						<hr />

						<select className="form-select d-inline w-auto mx-2" onChange={(e) => setYear(e.target.value)}>
							<option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
							<option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
							<option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
						</select>

						<hr />

						{/* get charts for invoices customer and calcs */}
						<Chart
							width={'100%'}
							height={'400px'}
							chartType="Bar"
							loader={<div>Caricamento Risorse</div>}
							data={data.chartData}
							options={{
								hAxis: {
									title: 'Mese',
								},
								vAxis: {
									title: 'Entrate',
								},
							}}
							rootProps={{ 'data-testid': '1' }}
						/>

						<p className="mb-0">Totale: <strong>&euro; {number_format(data.total, 2, ',', '.')}</strong></p>
						<p className="mb-0">Imponibile Tassabile ({getPercByAteco(ateco) * 100}%): <strong>&euro; {number_format(data.taxableIncome, 2, ',', '.')}</strong></p>
						<p className="mb-0">Tasse: <strong>&euro; {number_format(data.taxes, 2, ',', '.')}</strong></p>
						<p className="mb-0">Contributi: <strong>&euro; {number_format(data.contributions, 2, ',', '.')}</strong></p>
						<p className="mb-0">Tasse e Contributi da Pagare: <strong>&euro; {number_format(data.contributionsAndTaxes, 2, ',', '.')}</strong></p>
						<p className="mb-0">Spese Annue: <strong>&euro; {number_format(data.expenses, 2, ',', '.')}</strong></p>
						<p className="mb-0">Totale Netto: <strong>&euro; {number_format(data.netIncome, 2, ',', '.')}</strong></p>
					</>
					: null
			}
		</div>
	)
}

export default Home;