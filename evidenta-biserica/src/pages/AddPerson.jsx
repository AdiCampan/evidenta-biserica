import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

import { add } from '../features/persoaneSlice';



function AddPerson() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
 
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [adresa, setAdresa] = useState("")


  const handleClose = () => setShow(false);
 
  const addData = () => {
    const newPerson = {
      name: nume,
      surname: prenume,
      adress: adresa,
      id: Math.random().toString()
    };
    dispatch(add(newPerson));

  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Adauga Membru
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalii Membru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            placeholder='Nume'
            value={nume} 
            onChange={(event) => setNume(event.target.value)}
          ></input>
          <input
           placeholder='Prenume'
            value={prenume}
            onChange={(event) => setPrenume(event.target.value)}
            ></input>
          <input 
          placeholder='Adresa' 
          value={adresa}
          onChange={(event) => setAdresa(event.target.value)}
          ></input>
          <input placeholder='Nume'></input>
          <input placeholder='Nume'></input>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addData}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPerson;