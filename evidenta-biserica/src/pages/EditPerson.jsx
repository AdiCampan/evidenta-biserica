import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { edit } from '../features/persoaneSlice';
import { useSelector } from 'react-redux';




function EditPerson({ id }) {
  const dispatch = useDispatch();
  const person = useSelector((state) => state.persoane.lista.find(item => item.id == id));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nume, setNume] = useState(person.nume);
  const [prenume, setPrenume] = useState(person.prenume);
  const [adresa, setAdresa] = useState(person.adresa);

  useEffect(() => {
    setNume(person.nume);
    setPrenume(person.prenume);
    setAdresa(person.adresa);
    console.log('person', person);
    console.log(nume,prenume,adresa);

  }, [person]);

  const saveData = () => {
    const newPerson = {
      id: person.id,
      name: nume,
      surname: prenume,
      adress: adresa,
    };
    dispatch(edit(newPerson));

  }
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
          <input placeholder='Nume'></input>
          <input placeholder='Nume'></input>
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