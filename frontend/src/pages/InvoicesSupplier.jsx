import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EditInvoice from '../components/invoices/supplier/edit-invoice';
import ListInvoices from '../components/invoices/supplier/list-invoices';

import { InvoiceProvider } from '../contexts/invoice-context';

const InvoicesSupplier = ({ match }) => {
	return (
		<div className="invoices-suppliers-page">
			<InvoiceProvider>
				<Switch>
					<Route exact path={`${match.path}`} component={ListInvoices} />
					<Route exact path={`${match.path}/:id`} component={EditInvoice} />
				</Switch>
			</InvoiceProvider>
		</div>
	)
}

export default InvoicesSupplier;