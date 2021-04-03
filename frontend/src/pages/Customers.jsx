import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EditCustomer from '../components/anagraphics/customer/edit-customer';
import ListCustomers from '../components/anagraphics/customer/list-customers';

import { AnagraphicProvider } from '../contexts/anagraphic-context';

const Customers = ({ match }) => {
	return (
		<div className="customers-page">
			<AnagraphicProvider>
				<Switch>
					<Route exact path={`${match.path}`} component={ListCustomers} />
					<Route exact path={`${match.path}/:id`} component={EditCustomer} />
				</Switch>
			</AnagraphicProvider>
		</div>
	)
}

export default Customers;