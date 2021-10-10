import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeComponent from '../components/home-components';

import { InvoiceProvider } from '../contexts/invoice-context';

const Home = ({ match }) => {
	return (
		<div className="home-page">
			<InvoiceProvider>
				<Switch>
					<Route exact path={`${match.path}`} component={HomeComponent} />
				</Switch>
			</InvoiceProvider>
		</div>
	)
}

export default Home;