import React from 'react';

import { useInvoice } from '../../../contexts/invoice-context';
import { NewPageWrapper, NewPageWrapperCopy } from '../../../ui-components/custom-components';
import FormInvoice from '../../../ui-components/forms-components/invoice';

const NewInvoice = ({ setInvoices, setShowNewForm }) => {
  const { createInvoice, listInvoices } = useInvoice();

  const onSubmit = async (form) => {
		const { error } = await createInvoice(form);

		if (error !== null) return alert(`Errore`);

		const { data } = await listInvoices('CLIENTE', null, null, 12, 0);
		setInvoices(data.data);
		setShowNewForm(false);
	}

  return (
    <NewPageWrapper className="invoice-customer-new">
      <NewPageWrapperCopy>
        <div className="top-page">
          <h3 className="top-page-title">Nuovo Documento</h3>
          <button className="close-button" onClick={() => setShowNewForm(false)}>&times;</button>
        </div>

        <hr/>

        <FormInvoice handleSave={onSubmit} type="CLIENTE" />
      </NewPageWrapperCopy>
    </NewPageWrapper>
  )
}

export default NewInvoice;