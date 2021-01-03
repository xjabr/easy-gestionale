import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from '../navbar';

const Home = () => { 
	return (
		<h1>Ciao</h1>
	)
}

const Dashboard = () => {
	return (
		<BrowserRouter>
			<Navbar isAuth={true} />
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	)
}

export default Dashboard;