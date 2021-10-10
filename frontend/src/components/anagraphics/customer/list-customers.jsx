import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { useAnagraphic } from '../../../contexts/anagraphic-context';
import NewCustomer from './new-customer';
import { getPagination } from '../../../utils/functions';

const ListCustomers = (props) => {
  const { listAnagraphic, deleteAnagraphic } = useAnagraphic();
  const [customers, setCustomers] = useState(null);
  const [search, setSearch] = useState(null);
  const [filter, setFilter] = useState(null);

  const limit = 25;
  const [offset, setOffset] = useState(0);
  const [pagination, setPagination] = useState(null);

  const [showNewModal, setShowNewModal] = useState(false);

  useEffect(() => {
    const initCustomers = async () => {
      const { data } = await listAnagraphic('CUSTOMER', search, filter === 'null' ? null : filter, limit, offset);
      setCustomers(data.data);
      getPagination(data.length, limit, setOffset, setPagination);
    }

    initCustomers();
  }, [listAnagraphic, filter, limit, offset, search]);

  const handleDeleteCustomer = async (id) => {
    const confirmDelete = window.confirm('Sei sicuro di voler eliminare il cliente?');

    if (!confirmDelete) {
      return;
    }

    const { error } = await deleteAnagraphic(id);

    if (error !== null) {
      return console.log(error.response.data.description);
    }

    const { data } = await listAnagraphic('CUSTOMER', search, filter === 'null' ? null : filter, limit, offset);
    setCustomers(data.data);
    getPagination(data.length, limit, setOffset, setPagination);
  }

  const handleSearch = async () => {
    const { data } = await listAnagraphic('CUSTOMER', search, filter === 'null' ? null : filter, limit, offset);
    setCustomers(data.data);
    getPagination(data.length, limit, setOffset, setPagination);
  }

  return (
    <div className="list-customers-page">
      <div className="top-bar">
        <button className="btn btn-primary" onClick={() => setShowNewModal(!showNewModal)}>Nuovo cliente</button>

        <select className="form-select d-inline w-auto mx-2" onChange={(e) => setFilter(e.target.value)}>
          <option value="null">Seleziona un filtro</option>
        </select>

        <div className="wrapper-input-group w-auto d-inline-block">
          <div className="input-group">
            <input className="form-control" placeholder="Cerca cliente" onChange={(e) => setSearch(e.target.value)} />
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
            <th>Nome e Cognome</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Codice Fiscale</th>
            <th>Partita IVA</th>
            <th>Data Creazione</th>
          </tr>
        </thead>
        <tbody>
            {
              customers !== null ?
                customers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <NavLink to={`${props.match.path}/${item._id}`} className="btn btn-secondary"><FontAwesomeIcon icon={faEdit} /></NavLink>
                        <button type="button" onClick={() => handleDeleteCustomer(item._id)} className="mx-2 btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                      </td>
                      <td>{item.first_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.cf}</td>
                      <td>{item.p_iva}</td>
                      <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                    </tr>
                  )
                })
              : null
            }
        </tbody>
      </table>

      {showNewModal ? <NewCustomer setShowNewForm={setShowNewModal} setCustomers={setCustomers} /> : null}
    </div>
  )
}

export default ListCustomers;