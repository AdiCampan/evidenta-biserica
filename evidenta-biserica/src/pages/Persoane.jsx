
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import AddPerson from './AddPerson';
import { useNavigate } from 'react-router-dom';
import { useGetMembersQuery, useAddMemberMutation, useDelMemberMutation } from '../services/members';
import Confirmation from '../Confirmation';
import { calculateAge, formatDate, searchField, filterByText, filterByAge } from '../utils';

import './Persoane.scss';

function Persoane() {
  const navigate = useNavigate();

  const [idToDelete, setIdToDelete] = useState(null);
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [deleteMember] = useDelMemberMutation();


  function filterMembers(members) {
    let filteredMembers = members;

    filteredMembers = filterByText(filteredMembers, 'firstName', firstNameFilter);
    filteredMembers = filterByText(filteredMembers, 'lastName', lastNameFilter);
    filteredMembers = filterByAge(filteredMembers, 'birthDate', ageFilter);

    return filteredMembers;
  }

  function deletePerson(id) {
    deleteMember(id);

    setIdToDelete(null);
  };

  const showDeleteModal = (personId, ev) => {
    setIdToDelete(personId);
    ev.stopPropagation();
  }

  const goToPerson = (id) => {
    navigate(`/persoane/${id}`);
  };


  return (
    <div className="page-persons">
      <div className="lista_persoane">
        <div style={{ display: 'flex' }}>
          <AddPerson />
        </div>
        Lista de Persoane
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nume</th>
              <th>Prenume</th>
              <th>Adresa</th>
              <th>Telefon</th>
              <th>Varsta</th>
              <th>Data nasterii</th>
              <th>Sex</th>
              <th>Actiuni</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  value={firstNameFilter}
                  onChange={(e) => setFirstNameFilter(e.target.value)}
                />
              </td>
              <td>
               <input
                  type="text"
                  value={lastNameFilter}
                  onChange={(e) => setLastNameFilter(e.target.value)}
                />
              </td>
              <td></td>
              <td></td>
              <td>
                <input
                  className="age-input"
                  type="text"
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {persoane ? filterMembers(persoane).map((p, index) => (
              <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => goToPerson(p.id)}>
                <td>{index + 1}</td>
                <td>{p['firstName']}</td>
                <td>{p.lastName}</td>
                <td>{p.address}</td>
                <td>{p.mobilePhone}</td>
                <td>{calculateAge(p.birthDate)}</td>
                <td>{formatDate(p.birthDate)}</td>
                <td>{p.sex ? 'M' : 'F'}</td>
                <td>
                  <Button variant="primary" onClick={(event) => showDeleteModal(p.id, event)}>Sterge</Button>
                </td>

              </tr>

            )) : null}

          </tbody>

        </Table>

      </div>
      <Confirmation
        showModal={idToDelete != null}
        id={idToDelete}
        confirmModal={(id) => deletePerson(id)}
        message="Esti sigur ca vrei sa stergi persoana din baza de date ?"
        hideModal={() => setIdToDelete(null)}
      />
    </div>
  );
};

export default Persoane;