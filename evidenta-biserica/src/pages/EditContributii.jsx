import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function EditContributii() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState ("");

 function saveData(){

 };
 const handleShow = () => {
  setShow(true);
 };
  return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Modifica
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Contributia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              placeholder='Nr. Chitanta'
              value={receiptNumber}
              onChange={(event) => setReceiptNumber(event.target.value)}
            ></input>
            <input
              placeholder='Nume'
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></input>
            <input
              placeholder='Prenume'
              value={surname}
              onChange={(event) => setSurName(event.target.value)}
            ></input>
            <input
              placeholder='Suma'
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            ></input>
            <input
              placeholder='Data'
              value={date}
              onChange={(event) => setDate(event.target.value)}
            ></input>
            <input
              placeholder='Tip'
              value={type}
              onChange={(event) => setType(event.target.value)}
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
  )
}

export default EditContributii