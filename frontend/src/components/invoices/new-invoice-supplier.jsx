import React, { useEffect, useState } from 'react';

import { useInvoice } from '../../contexts/invoice.context';
import { NewPageWrapper, NewPageWrapperCopy } from '../../ui-components/custom-components';

import FormInvoice from '../../ui-components/forms-components/invoice';

const NewInvoice = ({ setInvoices, setShowNewForm }) => {
  const { createInvoice, listInvoices, getLastNr } = useInvoice();
	const [nr, setNr] = useState();

  const onSubmit = async (form) => {
		const { error } = await createInvoice(form);

		if (error !== null) return alert(`Errore`);

		const { data } = await listInvoices('FORNITORE', null, null, 25, 0);
		setInvoices(data.data);
		setShowNewForm(false);
	}

	useEffect(() => {
		const fetchLastNr = async () => {
			const { data, error } = await getLastNr('FORNITORE');
			if (error !== null) return alert(error.response.data.description);
			setNr(data.lastNr + 1);
		}

		fetchLastNr();
	}, [getLastNr]);

  return (
    <NewPageWrapper className="invoice-customer-new">
      <NewPageWrapperCopy>
        <div className="top-page">
          <h3 className="top-page-title">Nuovo Documento</h3>
          <button className="close-button" onClick={() => setShowNewForm(false)}>&times;</button>
        </div>

        <hr/>

        <FormInvoice handleSave={onSubmit} newNr={nr} type="FORNITORE" />
      </NewPageWrapperCopy>
    </NewPageWrapper>
  )
}

export default NewInvoice;