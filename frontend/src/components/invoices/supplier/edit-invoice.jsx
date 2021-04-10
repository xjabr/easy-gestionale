import React, { useState, useEffect } from 'react';

import { useInvoice } from '../../../contexts/invoice-context';
import FormInvoice from '../../../ui-components/forms-components/invoice';

const EditInvoice = (props) => {
	const { id } = props.match.params;
  const { updateInvoice, getSingleInvoice } = useInvoice();

	const [invoice, setInvoice] = useState(null);

  useEffect(() => {
		const getInvoice = async () => {
			const { data, error } = await getSingleInvoice(id);

			if (error !== null) {
				return window.location.href = '/fatture-acquisto';
			}

			setInvoice(data);
		}

		getInvoice();
	}, [getSingleInvoice, id])

  const onSubmit = async (form) => {
    const { error } = await updateInvoice(id, form);

    if (error !== null) return alert(`Errore`);

    window.location.reload();
  }

  return (
    <div className="invoice-customer-edit">
      <div className="top-page">
        <h3 className="top-page-title">Modifica Documento</h3>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-8">
          {
            invoice !== null ? 
            <FormInvoice invoice={invoice} handleSave={onSubmit} type="FORNITORE" />
            : null
          }
        </div>
      </div>

    </div>
  )
}

export default EditInvoice;