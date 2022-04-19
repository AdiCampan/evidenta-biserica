import { useSelector, useDispatch } from 'react-redux';
import { del } from '../features/contributiiSlice';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import AddContributii from './AddContributii';
import EditContributii from './EditContributii';

function Contributii() {
  const dispatch = useDispatch();
  const contributii = useSelector((state) => state.contributii.lista);
  const [listaContributii, setListaContributii] = useState(contributii)

  function deleteAmount(idToDelete) {
    dispatch(del(idToDelete));
  };
  

  return (
    <div style={{ backgroundColor: 'lightgrey' }}>
      <div className="lista_persoane">
        <AddContributii />
        Lista de Contributii
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nr. chitanta</th>
              <th>Nume</th>
              <th>Prenume</th>
              <th>Suma</th>
              <th>Data</th>
              <th>Categoria</th>
              <th>Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {contributii.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.receiptNumber}</td>
                <td>{p.name}</td>
                <td>{p.surname}</td>
                <td>{p.amount}</td>
                <td>{p.date}</td>
                <td>{p.type}</td>
                <td>
                  <EditContributii/>
                  <Button variant="primary" onClick={() => deleteAmount(p.id)}>Sterge</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
};

export default Contributii;