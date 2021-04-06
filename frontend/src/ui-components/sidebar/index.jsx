import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faReceipt, faFileInvoiceDollar, faUser, faHouseUser, faTachometerAlt, faTable } from '@fortawesome/free-solid-svg-icons';

const WrapperSidebar = styled.div`
  width: 17%;
  flex: 0 17%;
  background: #8194e4;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100%;
  padding: 20px;
  overflow: auto;
  color: #fff;

  h2 {
    font-size: 26px;
    font-weight: bold;
  }

  h4 {
    font-size: 16px;
    font-weight: bold;
    margin-top: 25px
  }

  hr {
    border-bottom: 1px solid #ddd;
  }

  a {
    display: block;
    width: 100%;
    padding: 10px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    margin-bottom: 5px;
    font-size: 14px;
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
      <h2>LAZWEB GESTIONALE</h2>

      <hr/>

      <h4>Principali</h4>
      <NavLink to="/"><FontAwesomeIcon icon={faTachometerAlt} />Dashboard</NavLink>

      <hr/>

      <h4>Anagrafiche</h4>
      <NavLink to="/clienti"><FontAwesomeIcon icon={faUser} />Clienti</NavLink>
      <NavLink to="/fornitori"><FontAwesomeIcon icon={faHouseUser} />Fornitori</NavLink>

      <hr/>

      <h4>Contabilità</h4>
      <NavLink to="/fatture-vendita"><FontAwesomeIcon icon={faFileInvoiceDollar} />Fatture Vendita</NavLink>
      <NavLink to="/fatture-acquisto"><FontAwesomeIcon icon={faFileInvoice} />Fatture Acquisto</NavLink>
      <NavLink to="/corrispettivi"><FontAwesomeIcon icon={faReceipt} />Corrispettivi</NavLink>

      <hr/>

      <h4>Altri</h4>
      <NavLink to="/prima-nota"><FontAwesomeIcon icon={faTable} />Prima Nota</NavLink>
    </WrapperSidebar>    
	)
}

export default Sidebar;