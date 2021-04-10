import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputText, InputNumber, InputDate, InputTextArea, InputSelect } from '../../forms';
import { useInvoice } from '../../../contexts/invoice-context';

const FormAnagraphic = ({ invoice = null, handleSave, type = 'CLIENTE' }) => {
	const { register, handleSubmit } = useForm({});
  const { getAnagraphicsForInvoice } = useInvoice();

  const [anagraphics, setAnagraphics] = useState(null);

  useEffect(() => {
    const getAnagraphics = async () => {
      const { data, error } = await getAnagraphicsForInvoice(type === 'CLIENTE' ? 'CUSTOMER' : 'SUPPLIER');
      console.log(data);

      if (error !== null ) return alert('Errore');

      const fixedObj = data.map((item, index) => {
        return {
          index: index,
          label: `${item.first_name}`,
          value: item._id
        };
      });

      setAnagraphics(fixedObj);
    }

    getAnagraphics();
  }, []);

	const onSubmit = async (data) => {
		data = { ...data, type, services: [] };
		await handleSave(data);
	}

  const type_document = [
    { value: 'FATTURA', label: 'FATTURA' },
    { value: 'NOTA CREDITO', label: 'NOTA CREDITO' }
  ];

  const payment_method = [
    { value: 'CONTANTI', label: 'CONTANTI' },
    { value: 'BONIFICO', label: 'BONIFICO' },
    { value: 'ASSEGNO', label: 'ASSEGNO' },
    { value: 'ALTRO', label: 'ALTRO' },
  ];

	return (
		<form className="margin-40" onSubmit={handleSubmit(onSubmit)}>
			<div className="row mb-3">
        <div className="col-md-3">
          <InputSelect defaultValue={invoice == null ? '' : invoice.type_document} data={type_document} label="Tipo Documento" name="type_document" register={register} isRequired={true} />
        </div>
        <div className="col-md-3">
          <InputNumber defaultValue={invoice == null ? '' : invoice.nr_document} label="Nr. Documento" name="nr_document" register={register} isRequired={true} />
        </div>
        <div className="col-md-3">
          <InputDate defaultValue={invoice == null ? '' : invoice.date_document} label="Data Documento" name="date_document" register={register} isRequired={true} />
        </div>
        <div className="col-md-3">
          {
            anagraphics !== null ?
            <InputSelect defaultValue={invoice == null ? '' : invoice.anagraphic_id} data={anagraphics} label={type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} name="anagraphic_id" register={register} isRequired={true} />
            : null
          }
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <InputSelect defaultValue={invoice == null ? '' : invoice.payment_method} data={payment_method} label="Metodo di Pagamento" name="payment_method" register={register} isRequired={true} />
        </div>
        <div className="col-md-3">
          <InputText defaultValue={invoice == null ? '' : invoice.bank} label="Banca" name="bank" register={register} isRequired={false} />
        </div>
        <div className="col-md-6">
          <InputText defaultValue={invoice == null ? '' : invoice.iban} label="IBAN" name="iban" register={register} isRequired={false} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <InputNumber price={true} defaultValue={invoice == null ? '' : invoice.discount} label="Sconto" name="discount" register={register} isRequired={false} />
        </div>
        <div className="col-md-3">
          <InputNumber price={true} defaultValue={invoice == null ? '' : invoice.other_taxes} label="Altre Tasse" name="other_taxes" register={register} isRequired={false} />
        </div>
      </div>

			<InputTextArea defaultValue={invoice == null ? '' : invoice.note} name="note" label="Note" register={register} isRequired={false} />

      <hr/>

      <h2>Servizi</h2>


			<hr />

			<input type="submit" className="btn btn-primary" value="Conferma" />
		</form>
	)
}

export default FormAnagraphic;