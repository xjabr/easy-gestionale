import React from 'react';

import { useAnagraphic } from '../../../contexts/anagraphic-context';
import { NewPageWrapper, NewPageWrapperCopy } from '../../../ui-components/custom-components';
import FormAnagraphic from '../../../ui-components/forms-components/anagraphic';

const NewSupplier = ({ setSuppliers, setShowNewForm }) => {
  const { createAnagraphic, listAnagraphic } = useAnagraphic();

  const onSubmit = async (form) => {
		const { error } = await createAnagraphic(form);

		if (error !== null) return alert(`Errore`);

		const { data } = await listAnagraphic('SUPPLIER', null, null, 12, 0);
		setSuppliers(data.data);
		setShowNewForm(false);
	}

  return (
    <NewPageWrapper className="supplier-new">
      <NewPageWrapperCopy>
        <div className="top-page">
          <h3 className="top-page-title">Nuovo Fornitore</h3>
          <button className="close-button" onClick={() => setShowNewForm(false)}>&times;</button>
        </div>

        <hr/>

        <FormAnagraphic handleSave={onSubmit} type="SUPPLIER" />
      </NewPageWrapperCopy>
    </NewPageWrapper>
  )
}

export default NewSupplier;