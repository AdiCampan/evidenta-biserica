
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';
import { add, del } from '../features/persoaneSlice';
import { useDispatch } from 'react-redux';
import { useGetMembersQuery, useAddMemberMutation, useDelMemberMutation } from '../services/members';
import Confirmation from '../Confirmation';

function Persoane() {
  const dispatch = useDispatch();
  const persoane = useSelector((state) => state.persoane.lista);
  const [idToDelete, setIdToDelete] = useState(null);

  const {data, error, isLoading, isFetching } = useGetMembersQuery();
  const [addMember, result] = useAddMemberMutation();
  const [deleteMember] = useDelMemberMutation();


  function deletePerson(id) {
    // <Confirmation  showModal={true}/>
    // alert("Esti sigur ca vrei sa stergi definitv persoana ?");
    // dispatch(del(id));
    deleteMember(id);
    
    setIdToDelete(null);
  };
  // console.log(idToDelete)

  return (
    <div style={{ backgroundColor: 'lightgrey' }}>
      <div className="lista_persoane">
        <AddPerson />

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
          {data ? data.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
                <td>{p.adress}</td>
                <td>{p.telefon}</td>
                <td>{p.email}</td>
                <td>{p.sex}</td>
                <td>
                  <EditPerson id={p.id} />
                  
                  <Button variant="primary" onClick={() =>setIdToDelete(p.id)}>Sterge</Button>
                </td>
              </tr>
            )): null}

          </tbody>
        </Table>
      </div>
      <Confirmation
        showModal={idToDelete != null}
        id={idToDelete}
        confirmModal={(id) => deletePerson(id)}
        message="Esti sigur ca vrei sa stergi persoana din baza de date ?"
        hideModal={(id) => setIdToDelete(null)}
      />
    </div>
  );
};

export default Persoane;