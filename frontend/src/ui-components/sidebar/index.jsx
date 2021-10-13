import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faFileInvoiceDollar, faUser, faHouseUser, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const WrapperSidebar = styled.div`
  width: 250px;
  flex: 0 250px;
  background: #8194e4;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100%;
  overflow: auto;
  color: #fff;

  h2 {
    font-size: 24px;
		padding: 20px;
		font-weight: bold;
  }

  h4 {
    font-size: 14px;
    margin-top: 25px
  }

  hr {
    border-bottom: 1px solid #ddd;
  }

  a {
    display: block;
    width: 100%;
    padding: 10px 20px;
    color: #eee;
    text-decoration: none;
	  font-size: 14px;
	  border-radius: 4px;
    display: flex;
    align-items: center;
    transition: .3s ease;

    &:hover {
      color: #fff;
    }

    svg {
      font-size: 24px;
      margin-right: 10px
    }
  }
`;

const Sidebar = () => {
	return (
    <WrapperSidebar>
			<h2>LAZWEB</h2>

      <NavLink to="/"><FontAwesomeIcon icon={faTachometerAlt} />Dashboard</NavLink>
			<hr />
      <NavLink to="/clienti"><FontAwesomeIcon icon={faUser} />Clienti</NavLink>
      <NavLink to="/fornitori"><FontAwesomeIcon icon={faHouseUser} />Fornitori</NavLink>
			<hr />
      <NavLink to="/fatture-vendita"><FontAwesomeIcon icon={faFileInvoiceDollar} />Fatture Vendita</NavLink>
      <NavLink to="/fatture-acquisto"><FontAwesomeIcon icon={faFileInvoice} />Fatture Acquisto</NavLink>

			<hr />

      <NavLink to="/preventivi"><FontAwesomeIcon icon={faFileInvoiceDollar} />Preventivi</NavLink>
    </WrapperSidebar>    
	)
}

export default Sidebar;