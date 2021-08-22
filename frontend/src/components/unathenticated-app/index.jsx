import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../login';
import Registration from '../registration';

const UnauthenticatedApp = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/registrati" component={Registration} />
			</Switch>
		</BrowserRouter>
	)
}

export default UnauthenticatedApp