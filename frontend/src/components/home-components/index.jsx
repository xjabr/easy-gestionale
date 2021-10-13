import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import { useAuth } from '../../contexts/auth-context';
import { useInvoice } from '../../contexts/invoice-context';
import { number_format } from '../../utils';
import { getPercByAteco } from '../../utils/ateco-codes';

const HomeComponent = () => {
	const { user, ateco } = useAuth();
	const { analysisCustomerInvoices } = useInvoice();

	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchAnalysisCustomerInvoice = async () => {
			const { data, error } = await analysisCustomerInvoices();
			if (error !== null) return alert(error.response.data.description);
			setData(data);
		}

		fetchAnalysisCustomerInvoice();
	}, []);

	return (
		<div className="dashboard-component">
			{
				user !== null && data !== null ?
					<>
						<h4 className="section-title">Benvenuto {`${user.user.first_name} ${user.user.last_name}`}</h4>
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
						<p className="mb-0">Imponibile Tassabile ({getPercByAteco(ateco)*100}%): <strong>&euro; {number_format(data.taxableIncome, 2, ',', '.')}</strong></p>
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

export default HomeComponent;