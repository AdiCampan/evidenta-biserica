
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import AddPerson from './AddPerson';
import { useNavigate } from 'react-router-dom';
import { useGetMembersQuery, useAddMemberMutation, useDelMemberMutation } from '../services/members';
import Confirmation from '../Confirmation';

function Persoane() {
  const navigate = useNavigate();

  const [idToDelete, setIdToDelete] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [deleteMember] = useDelMemberMutation();

  function onSearchPerson(e) {
    setSearchInput(e.target.value);
  }

  function filterMembers(member) {
    if (searchInput === '') {
      return true;
    }
    if (
      member.firstName.toLowerCase().indexOf(searchInput.trim().toLowerCase()) !== -1 ||
      member.lastName.toLowerCase().indexOf(searchInput.trim().toLowerCase()) !== -1 ||
      (member.address && member.address.toLowerCase().indexOf(searchInput.trim().toLowerCase()) !== -1) ||
      (member.mobilePhone && member.mobilePhone?.toLowerCase().indexOf(searchInput.trim().toLowerCase()) !== -1) ||
      (member.email && member.email?.toLowerCase().indexOf(searchInput.trim().toLowerCase()) !== -1)
    ) {
      return true;
    }
    return false;
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
    <div style={{ backgroundColor: 'lightgrey' }}>
      <div className="lista_persoane">
        <div style={{display: 'flex'}}>

          <AddPerson />

          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-sm"><BsSearch /></InputGroup.Text>
            <Form.Control aria-label="Cautare" aria-describedby="inputGroup-sizing-sm"
                onChange={onSearchPerson} placeholder="Cauta dupa nume, prenume, adresa, telefon sau email..." value={searchInput} />
          </InputGroup>
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
              <th>email</th>
              <th>Sex</th>
              <th>Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {persoane ? persoane.filter(filterMembers).map((p, index) => (
              <tr key={p.id} style={{cursor:'pointer'}} onClick={() => goToPerson(p.id)}>
                <td>{index + 1}</td>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
                <td>{p.address}</td>
                <td>{p.mobilePhone}</td>
                <td>{p.email}</td>
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