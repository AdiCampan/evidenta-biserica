import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { add, del } from '../features/biserici/bisericiSlice';
import Button from 'react-bootstrap/Button';
import { useGetChurchesQuery, useAddChurchMutation, useDelChurchMutation} from '../services/churches';
import './Biserici.css'
import Confirmation from '../Confirmation';

function Biserici() {
  const dispatch = useDispatch();
  const biserici = useSelector((state) => state.biserici.lista);
  const [church, setChurch] = useState("");
  const [place, setPlace] = useState("");


  const {data, error, isLoading, isFetching } = useGetChurchesQuery();
  const [addChurch, result] = useAddChurchMutation();
  const [delChurch] = useDelChurchMutation();
  const [idToDelete, setIdToDelete] = useState(null);

  function addData() {
    if (church != "" && place != "") {
      addChurch({
        name: church,
        address: place,
      });
      
      setChurch("");
      setPlace("");
    }
  };

  function deleteBiserica(id) {
    
    
    delChurch(id);
    setIdToDelete(null);
    // dispatch(del(idToDelete));
    console.log(id)

  };

  return (
    <div className="biserici" >
      {isLoading ? <p>Loading</p> : null}
      <button onClick={addData}>Adauga</button>
      <input
        placeholder="Numele Bisericii"
        value={church}
        onChange={(event) => setChurch(event.target.value)}
      ></input>
      <input
        placeholder="Localitatea"
        value={place}
        onChange={(event) => setPlace(event.target.value)}
      ></input>
      <div className="lista_biserici">
        Lista Biserici
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nume</th>
              <th>Localitate</th>
              <th>Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {data ? data.map((biserica, index) => (
              <tr key={biserica.id}>
                <td>{index + 1}</td>
                <td>{biserica.name}</td>
                <td>{biserica.address}</td>
                <td>
                  <Button variant="primary">Modifica</Button>
                  <Button variant="primary" onClick={() => setIdToDelete(biserica.id)} >Sterge</Button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </Table>
      </div>
      <Confirmation
        showModal={idToDelete != null}
        id={idToDelete}
        confirmModal={(id) => deleteBiserica(id)}
        message="Esti sigur ca vrei sa stergi persoana din baza de date ?"
        hideModal={(id) => setIdToDelete(null)}
      />
    </div>
  )
};

export default Biserici;