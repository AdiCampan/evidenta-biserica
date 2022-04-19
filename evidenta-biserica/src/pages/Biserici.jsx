import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { add, del } from '../features/biserici/bisericiSlice';
import Button from 'react-bootstrap/Button';
import { useGetChurchesQuery, useAddChurchMutation } from '../services/churches';
import './Biserici.css'

function Biserici() {
  const dispatch = useDispatch();
  const biserici = useSelector((state) => state.biserici.lista);
  const [church, setChurch] = useState("");
  const [place, setPlace] = useState("");


  const {data, error, isLoading, isFetching } = useGetChurchesQuery();
  const [addChurch, result] = useAddChurchMutation();

  function addData() {
    if (church != "" && place != "") {
      addChurch({
        //id: Math.random().toString(),
        name: church,
        address: place,
      });
      
      setChurch("");
      setPlace("");
    }
  };

  function deleteBiserica(idToDelete) {
    dispatch(del(idToDelete));
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
                  <Button variant="primary" onClick={() => deleteBiserica(biserica.id)} >Sterge</Button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </Table>
      </div>
    </div>
  )
};

export default Biserici;