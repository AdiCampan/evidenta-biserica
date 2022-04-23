import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { edit } from '../features/persoaneSlice';
import { useSelector } from 'react-redux';
import { useGetMembersQuery, useAddMemberMutation, useDelMemberMutation, useModifyMemberMutation } from '../services/members';


function EditPerson({ id }) {
  const dispatch = useDispatch();
  // const person = useSelector((state) => state.persoane.lista.find(item => item.id == id));  
  const {data, error, isLoading, isFetching } = useGetMembersQuery();
  const person = data.find(item => item.id == id);
  const [modifyMember, result] = useModifyMemberMutation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [adresa, setAdresa] = useState('');
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");

  const handleShow = () => {
    setShow(true);
    setNume(person.firstName);
    setPrenume(person.lastName);
    // setAdresa(person.adress);
    // setTelefon(person.telefon);
    // setEmail(person.email);
    // setSex(person.sex);      
  }
  const saveData = (id) => {
    const newPerson = {
      id: person.id,
      firstName: nume,
      lastName: prenume,
      adress: adresa,
      telefon: telefon,
      email: email,
      sex: sex,
    };
    if (nume != "" && prenume != "" ) {
      modifyMember(newPerson);
      setShow(false);
    }
    else {
      alert ("Nu stergeti numele sau prenumele !")
    }; 
    console.log(newPerson);
  };
 
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Modifica
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fisa de Membru</Modal.Title>
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
          <input
            placeholder='Telefon'
            value={telefon}
            onChange={(event) => setTelefon(event.target.value)}
          ></input>
          <input
            placeholder='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            placeholder='Sex'
            value={sex}
            onChange={(event) => setSex(event.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPerson;