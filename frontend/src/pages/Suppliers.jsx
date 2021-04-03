import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EditSupplier from '../components/anagraphics/supplier/edit-supplier';
import ListSuppliers from '../components/anagraphics/supplier/list-suppliers';

import { AnagraphicProvider } from '../contexts/anagraphic-context';

const Suppliers = ({ match }) => {
	return (
		<div className="suppliers-page">
			<AnagraphicProvider>
				<Switch>
					<Route exact path={`${match.path}`} component={ListSuppliers} />
					<Route exact path={`${match.path}/:id`} component={EditSupplier} />
				</Switch>
			</AnagraphicProvider>
		</div>
	)
}

export default Suppliers;