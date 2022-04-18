
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';

function Persoane() {
  const persoane = useSelector((state) => state.persoane.lista);
  const [listaPersoane, setListaPersoane] = useState(persoane)

  const savePersonData = (enteredPersonData) => {
    setListaPersoane([
      ...listaPersoane,
      enteredPersonData,
      
    ])
  };
  function deletePerson(idToDelete) {
    setListaPersoane([
      ...listaPersoane.filter(person => {
        if (person.id == idToDelete) {
          return false;
        }
        return true;
      })
    ])
  }
  return (
    <div style={{ backgroundColor: 'lightgrey' }}>
      <div className="lista_persoane">
        <AddPerson onAddPersonData={savePersonData} />

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
            {persoane.map((p, index) => (
              <tr key={p.id}>
                <td>{index+1}</td>
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
            ))}

          </tbody>
        </Table>
      </div>

    </div>
  );
};

export default Persoane;