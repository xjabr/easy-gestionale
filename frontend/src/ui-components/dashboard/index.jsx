import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../navbar';
import Sidebar from '../sidebar';

const WrapperMain = styled.div`
	width: 85%;
	flex: 0 85%;
	position: fixed;
	right: 0;
	bottom: 0;
	height: calc(100% - 76px);
	padding: 10px;
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
			<Navbar isAuth={true} />
			<Sidebar></Sidebar>
			<WrapperMain>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</WrapperMain>
		</BrowserRouter>
	)
}

export default Dashboard;