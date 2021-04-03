import React from 'react';

import { useAnagraphic } from '../../../contexts/anagraphic-context';
import { NewPageWrapper, NewPageWrapperCopy } from '../../../ui-components/custom-components';
import FormAnagraphic from '../../../ui-components/forms-components/anagraphic';

const NewCustomer = ({ setCustomers, setShowNewForm }) => {
  const { createAnagraphic, listAnagraphic } = useAnagraphic();

  const onSubmit = async (form) => {
		const { error } = await createAnagraphic(form);

		if (error !== null) return alert(`Errore`);

		const { data } = await listAnagraphic('CUSTOMER', null, null, 12, 0);
		setCustomers(data.data);
		setShowNewForm(false);
	}

  return (
    <NewPageWrapper className="customer-new">
      <NewPageWrapperCopy>
        <div className="top-page">
          <h3 className="top-page-title">Nuovo Cliente</h3>
          <button className="close-button" onClick={() => setShowNewForm(false)}>&times;</button>
        </div>

        <hr/>

        <FormAnagraphic handleSave={onSubmit} type="CUSTOMER" />
      </NewPageWrapperCopy>
    </NewPageWrapper>
  )
}

export default NewCustomer;