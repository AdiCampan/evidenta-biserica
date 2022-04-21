
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';
import { add, del } from '../features/persoaneSlice';
import { useDispatch } from 'react-redux';
import { useGetMembersQuery, useAddMemberMutation } from '../services/members';
import Confirmation from '../Confirmation';


function Persoane() {
  const dispatch = useDispatch();
  const persoane = useSelector((state) => state.persoane.lista);
  const [listaPersoane, setListaPersoane] = useState(persoane)

  const {data, error, isLoading, isFetching } = useGetMembersQuery();
  const [addMember, result] = useAddMemberMutation();

  function deletePerson(idToDelete) {
    // <Confirmation  showModal={true}/>
    // alert("Esti sigur ca vrei sa stergi definitv persoana ?");
    dispatch(del(idToDelete));
  };
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
                <td>{p.name}</td>
                <td>{p.surname}</td>
                <td>{p.adress}</td>
                <td>{p.telefon}</td>
                <td>{p.email}</td>
                <td>{p.sex}</td>
                <td>
                  <EditPerson id={p.id} />
                  
            
                  <Button variant="primary" onClick={() => deletePerson(p.id)}>Sterge</Button>
                </td>
              </tr>
            )): null}

          </tbody>
        </Table>
      </div>

    </div>
  );
};

export default Persoane;