import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAnagraphic } from '../../contexts/anagraphic.context';
import FormAnagraphic from '../../ui-components/forms-components/anagraphic';
import { useAuth } from '../../contexts/auth.context';

const EditSupplier = (props) => {
	const router = useRouter();
	const { id } = router.query;

	const { isLoggedIn } = useAuth();
	const { updateAnagraphic, getSingleAnagraphic } = useAnagraphic();

	const [supplier, setSupplier] = useState(null);

	useEffect(() => {
		if (!isLoggedIn || id === undefined) return ;

		const getSupplier = async () => {
			const { data, error } = await getSingleAnagraphic(id);

			if (error !== null) {
				return window.location.href = '/clienti';
			}

			setSupplier(data);
		}

		getSupplier();
	}, [isLoggedIn, getSingleAnagraphic, id])

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