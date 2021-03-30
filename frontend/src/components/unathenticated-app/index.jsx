import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../login';
import Navbar from '../../ui-components/navbar';

const UnauthenticatedApp = () => {
	return (
		<BrowserRouter>
			<Navbar isAuth={false} />
			<Switch>
				<Route exact path="/" component={Login} />
			</Switch>
		</BrowserRouter>
	)
}

export default UnauthenticatedApp