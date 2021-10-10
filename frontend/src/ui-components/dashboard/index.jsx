import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../sidebar';

import Customers from '../../pages/Customers';
import Suppliers from '../../pages/Suppliers';
import InvoicesCustomer from '../../pages/InvoicesCustomer';
import InvoicesSupplier from '../../pages/InvoicesSupplier';
import { useAuth } from '../../contexts/auth-context';

const WrapperMain = styled.div`
	width: calc(100% - 250px);
	flex: 0 calc(100% - 250px);
	position: fixed;
	right: 0;
	bottom: 0;
	height: 100%;
	padding: 20px;
	overflow: auto;
`;

const Home = () => {
	const { user } = useAuth();

	return (
		<div className="dashboard-component">
			{
				user !== null ?
					<>
						<h4 className="section-title">Benvenuto {`${user.user.first_name} ${user.user.last_name}`}</h4>
						<hr />

						{/* get charts for invoices customer and calcs */}
					</>
					: null
			}
		</div>
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
					<Route path="/fatture-vendita" component={InvoicesCustomer} />
					<Route path="/fatture-acquisto" component={InvoicesSupplier} />
				</Switch>
			</WrapperMain>
		</BrowserRouter>
	)
}

export default Dashboard;