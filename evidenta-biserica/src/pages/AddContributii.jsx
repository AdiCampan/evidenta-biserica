import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../features/contributiiSlice';

function AddContributii() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [type, setType] = useState("");

  const addData = () => {
    const newAmount = {
      name: name,
      surname: surname,
      amount: amount,
      date: date,
      receiptNumber: receiptNumber,
      type: type,
      id: Math.random().toString()
    };
    if (name != "" && surname != "") {
      setName("");
      setSurname("");
      setAmount("");
      setShow(false);
      dispatch(add(newAmount));
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Adauga Contributie
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalii Membru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            placeholder='receiptNumber'
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
            onChange={(event) => setSurname(event.target.value)}
          ></input>
          <input
            placeholder='Suma'
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          ></input>
          <input
            placeholder='Tipul donatiei'
            value={type}
            onChange={(event) => setType(event.target.value)}
          ></input>
          <input
            placeholder='Data'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          ></input>
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
  )
};

export default AddContributii;