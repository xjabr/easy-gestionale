import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { useAnagraphic } from '../../contexts/anagraphic.context';
import NewSupplier from '../../components/anagraphics/new-supplier';
import { getPagination } from '../../utils/functions';
import { useAuth } from '../../contexts/auth.context';

const ListSuppliers = (props) => {
	const { isLoggedIn } = useAuth();
  const { listAnagraphic, deleteAnagraphic } = useAnagraphic();
  const [suppliers, setSuppliers] = useState(null);
  const [search, setSearch] = useState(null);
  const [filter, setFilter] = useState(null);

  const limit = 25;
  const [offset, setOffset] = useState(0);
  const [pagination, setPagination] = useState(null);

  const [showNewModal, setShowNewModal] = useState(false);

  useEffect(() => {
		if (!isLoggedIn) return ;

    const initSuppliers = async () => {
      const { data } = await listAnagraphic('SUPPLIER', search, filter === 'null' ? null : filter, limit, offset);
      setSuppliers(data.data);
      getPagination(data.length, limit, setOffset, setPagination);
    }

    initSuppliers();
  }, [isLoggedIn, listAnagraphic, filter, limit, offset, search]);

  const handleDeleteSupplier = async (id) => {
    const confirmDelete = window.confirm('Sei sicuro di voler eliminare il fornitore?');

    if (!confirmDelete) {
      return;
    }

    const { error } = await deleteAnagraphic(id);

    if (error !== null) {
      return console.log(error.response.data.description);
    }

    const { data } = await listAnagraphic('SUPPLIER', search, filter === 'null' ? null : filter, limit, offset);
    setSuppliers(data.data);
    getPagination(data.length, limit, setOffset, setPagination);
  }

  const handleSearch = async () => {
    const { data } = await listAnagraphic('SUPPLIER', search, filter === 'null' ? null : filter, limit, offset);
    setSuppliers(data.data);
    getPagination(data.length, limit, setOffset, setPagination);
  }

  return (
    <div className="list-suppliers-page">
      <div className="top-bar">
        <button className="btn btn-primary" onClick={() => setShowNewModal(!showNewModal)}>Nuovo fornitore</button>

        <select className="form-select d-inline w-auto mx-2" onChange={(e) => setFilter(e.target.value)}>
          <option value="null">Seleziona un filtro</option>
        </select>

        <div className="wrapper-input-group w-auto d-inline-block">
          <div className="input-group">
            <input className="form-control" placeholder="Cerca fornitore" onChange={(e) => setSearch(e.target.value)} />
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
            <th>Ragione Sociale</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Codice Fiscale</th>
            <th>Partita IVA</th>
            <th>Data Creazione</th>
          </tr>
        </thead>
        <tbody>
            {
              suppliers !== null ?
                suppliers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a href={`${props.match.path}/${item._id}`} className="btn btn-secondary"><FontAwesomeIcon icon={faEdit} /></a>
                        <button type="button" onClick={() => handleDeleteSupplier(item._id)} className="mx-2 btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
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

      {showNewModal ? <NewSupplier setShowNewForm={setShowNewModal} setSuppliers={setSuppliers} /> : null}
    </div>
  )
}

export default ListSuppliers;