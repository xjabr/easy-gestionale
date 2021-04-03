import React, { useState, useEffect } from 'react';

import { useAnagraphic } from '../../../contexts/anagraphic-context';
import FormAnagraphic from '../../../ui-components/forms-components/anagraphic';

const EditSupplier = (props) => {
	const { id } = props.match.params;
  const { updateAnagraphic, getSingleAnagraphic } = useAnagraphic();

	const [supplier, setSupplier] = useState(null);

  useEffect(() => {
		const getSupplier = async () => {
			const { data, error } = await getSingleAnagraphic(id);

			if (error !== null) {
				return window.location.href = '/clienti';
			}

			setSupplier(data);
		}

		getSupplier();
	}, [getSingleAnagraphic, id])

  const onSubmit = async (form) => {
    const { error } = await updateAnagraphic(id, form);

    if (error !== null) return alert(`Errore`);

    window.location.reload();
  }

  return (
    <div className="Supplier-new">
      <div className="top-page">
        <h3 className="top-page-title">Modifica Fornitore</h3>
      </div>

      <hr />

      {
        supplier !== null ? 
        <FormAnagraphic customer={supplier} handleSave={onSubmit} type="SUPPLIER" />
        : null
      }
    </div>
  )
}

export default EditSupplier;