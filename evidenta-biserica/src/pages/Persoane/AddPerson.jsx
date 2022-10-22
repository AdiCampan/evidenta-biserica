import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControlLabel from '@mui/material/FormControlLabel';
import DatePicker from 'react-datepicker';
import { useAddMemberMutation } from '../../services/members';



function AddPerson() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [birthDate, setBirthDate] = useState("");
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
      birthDate: birthDate,
      // address: adresa,
      // telefon: telefon,
      // email: email,
      sex: sex,
    };

    // id: Math.random().toString()

    if (nume != "" && prenume != "" && birthDate != "") {
      setNume("");
      setPrenume("");
      setBirthDate("");
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
        Adauga persoana
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adăugare persoană nouă</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Nume</InputGroup.Text>
                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  onChange={(event) => setNume(event.target.value)} value={nume} />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Prenume</InputGroup.Text>
                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  value={prenume}
                  onChange={(event) => setPrenume(event.target.value)} />
              </InputGroup>
            </Col>
          
            <Col>
              <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <InputGroup.Text >Data nasterii</InputGroup.Text>
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  peekNextMonth
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </InputGroup>
            </Col>
        
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