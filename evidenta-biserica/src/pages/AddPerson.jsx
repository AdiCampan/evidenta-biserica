import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useAddMemberMutation } from '../services/members';

import { add } from '../features/persoaneSlice';



function AddPerson() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
 
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  // const [adresa, setAdresa] = useState("");
  // const [telefon, setTelefon] = useState("");
  // const [email, setEmail] = useState("");
  const [sex, setSex] = useState(true);

  const [addMember, result] = useAddMemberMutation();

  const handleClose = () => setShow(false);
 
  useEffect(() => {
    if (result.isSuccess) {
      setShow(false);
      // onAddChild(result.data_id);
    }
  }, [result]);

  const addData = () => {
    const newPerson = {
      firstName: nume,
      lastName: prenume,
      // address: adresa,
      // telefon: telefon,
      // email: email,
      sex: sex,
    };

    // id: Math.random().toString()

    if (nume != "" && prenume != "") {
      setNume("");
      setPrenume("");
      // setAdresa("");
      // setTelefon("");
      // setEmail("");
      setSex("");
      addMember(newPerson);
      
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Adauga 
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
          {/* <input 
          placeholder='Adresa' 
          value={adresa}
          onChange={(event) => setAdresa(event.target.value)}
          ></input>
          <input
            placeholder='Telefon'
            value={telefon} 
            onChange={(event) => setTelefon(event.target.value)}
          ></input>
          <input
            placeholder='email'
            value={email} 
            onChange={(event) => setEmail(event.target.value)}
          ></input> */}
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" active={sex == true} onClick={() => setSex(true)}>M</Button>
            <Button variant="secondary" active={sex == false} onClick={() => setSex(false)}>F</Button>
          </ButtonGroup>
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