import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EditInvoice from '../components/invoices/customer/edit-invoice';
import ListCustomers from '../components/invoices/customer/list-invoices';

import { InvoiceProvider } from '../contexts/invoice-context';

const Customers = ({ match }) => {
	return (
		<div className="invoices-customers-page">
			<InvoiceProvider>
				<Switch>
					<Route exact path={`${match.path}`} component={ListCustomers} />
					<Route exact path={`${match.path}/:id`} component={EditInvoice} />
				</Switch>
			</InvoiceProvider>
		</div>
	)
}

export default Customers;