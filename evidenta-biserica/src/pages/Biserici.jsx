import React, { useState } from 'react';

import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux'
//import "./Biserici.css";
import Button from 'react-bootstrap/Button';

function Biserici() {

  const biserici = useSelector((state) => state.biserici.lista);
  const [church, setChurch] = useState("");
  const [listaBiserici, setListaBiserici] = useState(biserici);
  const [place, setPlace] = useState("");

  function addData() {
    
    if (church != "" || place != "") {
      setListaBiserici([
      ...listaBiserici,
      {
        id: Math.random().toString(),
        name: church,
        adress: place,
      }
    ]);
    }
    setChurch("");
    setPlace("");
  };

  function deleteBiserica(idToDelete) {
    setListaBiserici([
      ...listaBiserici.filter(biserica => {
        if (biserica.id === idToDelete) {
          return false;
        }
        return true;
      })
    ]);
  };

  return (
    <div className="biserici">
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
            {listaBiserici.map((biserica, index) => (
              <tr key={biserica.id}>

                <td>{index + 1}</td>
                <td>{biserica.name}</td>
                <td>{biserica.adress}</td>
                <td>
                  <Button variant="primary">Modifica</Button>
                  <Button variant="primary" onClick={() => deleteBiserica(biserica.id)} >Sterge</Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>


      </div>
    </div>
  )
};

export default Biserici;