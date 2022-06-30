import React, { useEffect, useState } from 'react';

import { useQuote } from '../../contexts/quote.context';
import { NewPageWrapper, NewPageWrapperCopy } from '../../ui-components/custom-components';
import FormQuote from '../../ui-components/forms-components/quote';

const NewQuote = ({ setQuotes, setShowNewForm }) => {
  const { createQuote, listQuotes, getLastNr } = useQuote();
	const [nr, setNr] = useState();


  const onSubmit = async (form) => {
		const { error } = await createQuote(form);

		if (error !== null) return alert(`Errore`);

		const { data } = await listQuotes(null, null, 25, 0);
		setQuotes(data.data);
		setShowNewForm(false);
	}

	useEffect(() => {
		const fetchLastNr = async () => {
			const { data, error } = await getLastNr();
			if (error !== null) return alert(error.response.data.description);
			setNr(data.lastNr + 1);
		}

		fetchLastNr();
	}, [getLastNr]);

  return (
    <NewPageWrapper className="quote-customer-new">
      <NewPageWrapperCopy>
        <div className="top-page">
          <h3 className="top-page-title">Nuovo Documento</h3>
          <button className="close-button" onClick={() => setShowNewForm(false)}>&times;</button>
        </div>

        <hr/>

        <FormQuote handleSave={onSubmit} newNr={nr} />
      </NewPageWrapperCopy>
    </NewPageWrapper>
  )
}

export default NewQuote;