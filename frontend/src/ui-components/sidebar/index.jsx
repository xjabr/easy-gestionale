import React from 'react';

// import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faFileInvoiceDollar, faUser, faHouseUser, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
	return (
    <div className='sidebar'>
			<h2>LAZWEB</h2>

      <a href="/"><FontAwesomeIcon icon={faTachometerAlt} />Dashboard</a>
			<hr />
      <a href="/customers"><FontAwesomeIcon icon={faUser} />Clienti</a>
      <a href="/suppliers"><FontAwesomeIcon icon={faHouseUser} />Fornitori</a>
			<hr />
      <a href="/invoices/customers"><FontAwesomeIcon icon={faFileInvoiceDollar} />Fatture Vendita</a>
      <a href="/invoices/suppliers"><FontAwesomeIcon icon={faFileInvoice} />Fatture Acquisto</a>

			<hr />

      <a href="/quotes"><FontAwesomeIcon icon={faFileInvoiceDollar} />Preventivi</a>
    </div>    
	)
}

export default Sidebar;