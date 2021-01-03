import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faReceipt, faFileInvoiceDollar, faUser, faHouseUser, faTachometerAlt, faTable } from '@fortawesome/free-solid-svg-icons';

const WrapperSidebar = styled.div`
  width: 20%;
  flex: 0 20%;
  background: #8194e4;
  position: fixed;
  left: 0;
  bottom: 0;
  bottom: 0;
  height: calc(100% - 95px);
  padding: 30px;
  overflow: auto;

  hr {
    border-bottom: 1px solid #ddd;
  }

  a {
    display: block;
    width: 100%;
    padding: 10px 15px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    margin-bottom: 10px;
    background: #7088ec;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transition: .3s ease;

    &:hover {
      background: #6881ec;
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

      <NavLink to="/"><FontAwesomeIcon icon={faTachometerAlt} />Dashboard</NavLink>

      <hr/>

      <NavLink to="/clienti"><FontAwesomeIcon icon={faUser} />Clienti</NavLink>
      <NavLink to="/fornitori"><FontAwesomeIcon icon={faHouseUser} />Fornitori</NavLink>

      <hr/>

      <NavLink to="/fatture-vendita"><FontAwesomeIcon icon={faFileInvoiceDollar} />Fatture Vendita</NavLink>
      <NavLink to="/fatture-acquisto"><FontAwesomeIcon icon={faFileInvoice} />Fatture Acquisto</NavLink>
      <NavLink to="/corrispettivi"><FontAwesomeIcon icon={faReceipt} />Corrispettivi</NavLink>

      <hr/>

      <NavLink to="/prima-nota"><FontAwesomeIcon icon={faTable} />Prima Nota</NavLink>
    </WrapperSidebar>    
	)
}

export default Sidebar;