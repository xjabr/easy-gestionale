import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { useInvoice } from '../../../contexts/invoice-context';
import NewInvoice from './new-invoice';
import { getPagination } from '../../../utils/functions';

const ListInvoicesCustomers = (props) => {
  const { listInvoices, deleteInvoice } = useInvoice();
  const [invoices, setInvoices] = useState(null);
  const [search, setSearch] = useState(null);
  const [filter, setFilter] = useState(null);

  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [pagination, setPagination] = useState(null);

  const [showNewModal, setShowNewModal] = useState(false);

  useEffect(() => {
    const initInvoices = async () => {
      const { data } = await listInvoices('CLIENTE', search, filter === 'null' ? null : filter, limit, offset);
      setInvoices(data.data);
      getPagination(data.length, limit, setOffset, setPagination);
    }

    initInvoices();
  }, [listInvoices, filter, limit, offset, search]);

  const handleDeleteInvoice = async (id) => {
    const confirmDelete = window.confirm('Sei sicuro di voler eliminare il documento?');

    if (!confirmDelete) {
      return;
    }

    const { error } = await deleteInvoice(id);

    if (error !== null) {
      return console.log('Impossibile eliminare il documento');
    }

    const { data } = await listInvoices('CLIENTE', search, filter === 'null' ? null : filter, limit, offset);
    setInvoices(data.data);
    getPagination(data.length, limit, setOffset, setPagination);
  }

  const handleSearch = async () => {
    const { data } = await listInvoices('CLIENTE', search, filter === 'null' ? null : filter, limit, offset);
    setInvoices(data.data);
    getPagination(data.length, limit, setOffset, setPagination);
  }

  return (
    <div className="list-invoices-customers-page">
      <div className="top-bar">
        <button className="btn btn-primary" onClick={() => setShowNewModal(!showNewModal)}>Nuovo Documento</button>

        <select className="form-select d-inline w-auto mx-2" onChange={(e) => setFilter(e.target.value)}>
          <option value="null">Seleziona un filtro</option>
        </select>

        <div className="wrapper-input-group w-auto d-inline-block">
          <div className="input-group">
            <input className="form-control" placeholder="Cerca documento" onChange={(e) => setSearch(e.target.value)} />
            <input className="btn btn-primary" type="submit" value="Cerca" onClick={handleSearch} />
          </div>
        </div>
      </div>

      <hr />

      <nav className="pagination-section">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => { if (offset > 0) setOffset(offset - limit) }} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pagination}
          <li className="page-item">
            <button className="page-link" onClick={() => { setOffset(offset + limit) }} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th></th>
            <th>Tipo Documento</th>
            <th>Nr. Documento</th>
            <th>Data Documento</th>
            <th>Cliente</th>
            <th>Metodo di Pagamento</th>
            <th>Totale</th>
            <th>Data Creazione</th>
          </tr>
        </thead>
        <tbody>
            {
              invoices !== null ?
                invoices.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <NavLink to={`${props.match.path}/${item._id}`} className="btn btn-secondary"><FontAwesomeIcon icon={faEdit} /></NavLink>
                        <button type="button" onClick={() => handleDeleteInvoice(item._id)} className="mx-2 btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                      </td>
                      <td>{item.type_document}</td>
                      <td>{item.nr_document}</td>
                      <td>{moment(item.date_document).format('DD/MM/YYYY')}</td>
                      <td>{`${item.anagraphicdata[0].first_name}`}</td>
                      <td>{item.payment_method}</td>
                      <td>&euro; {parseFloat(item.tot).toFixed(2)}</td>
                      <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                    </tr>
                  )
                })
              : null
            }
        </tbody>
      </table>

      {showNewModal ? <NewInvoice setShowNewForm={setShowNewModal} setInvoices={setInvoices} /> : null}
    </div>
  )
}

export default ListInvoicesCustomers;