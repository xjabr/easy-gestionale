import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAnagraphic } from '../../contexts/anagraphic.context';
import FormAnagraphic from '../../ui-components/forms-components/anagraphic';
import { useAuth } from '../../contexts/auth.context';

const EditCustomer = () => {
	const router = useRouter();
	const { id } = router.query;

	const { isLoggedIn } = useAuth();
  const { updateAnagraphic, getSingleAnagraphic } = useAnagraphic();

	const [customer, setCustomer] = useState(null);

  useEffect(() => {
		if (!isLoggedIn || id === undefined) return ;

		const getCustomer = async () => {
			const { data, error } = await getSingleAnagraphic(id);

			if (error !== null) {
				return window.location.href = '/customers';
			}

			setCustomer(data);
		}

		getCustomer();
	}, [getSingleAnagraphic, id, isLoggedIn])

  const onSubmit = async (form) => {
    const { error } = await updateAnagraphic(id, form);

    if (error !== null) return alert(`Errore`);

    window.location.reload();
  }

  return (
    <div className="customer-new">
      <div className="top-page">
        <h3 className="top-page-title">Modifica Cliente</h3>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-12">
          {
            customer !== null ? 
            <FormAnagraphic customer={customer} handleSave={onSubmit} type="CUSTOMER" />
            : null
          }
        </div>
      </div>

    </div>
  )
}

export default EditCustomer;