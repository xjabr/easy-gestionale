import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EditQuote from '../components/quotes/customer/edit-quote';
import ListCustomers from '../components/quotes/customer/list-quotes';

import { QuoteProvider } from '../contexts/quote-context';

const Customers = ({ match }) => {
	return (
		<div className="quotes-customers-page">
			<QuoteProvider>
				<Switch>
					<Route exact path={`${match.path}`} component={ListCustomers} />
					<Route exact path={`${match.path}/:id`} component={EditQuote} />
				</Switch>
			</QuoteProvider>
		</div>
	)
}

export default Customers;