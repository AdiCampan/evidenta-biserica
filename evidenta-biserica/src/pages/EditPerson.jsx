import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


function EditPerson(props, { onModifyData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nume, setNume] = useState(props.nume);
  const [prenume, setPrenume] = useState(props.prenume);
  const [adresa, setAdresa] = useState(props.adresa);

  const saveData = () => {
    const newPerson = {
      name: nume,
      surname: prenume,
      adress: adresa,
    };
    console.log(newPerson);
    onModifyData (newPerson);

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