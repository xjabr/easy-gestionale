import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../sidebar';

import Customers from '../../pages/Customers';
import Suppliers from '../../pages/Suppliers';

const WrapperMain = styled.div`
	width: 80%;
	flex: 0 80%;
	position: fixed;
	right: 0;
	bottom: 0;
	height: 100%;
	padding: 20px;
	overflow: auto;
`;

const Home = () => { 
	return (
		<h1>Ciao</h1>
	)
}

const Dashboard = () => {
	return (
		<BrowserRouter>
			<Sidebar></Sidebar>
			<WrapperMain>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/clienti" component={Customers} />
					<Route path="/fornitori" component={Suppliers} />
				</Switch>
			</WrapperMain>
		</BrowserRouter>
	)
}

export default Dashboard;