
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Typeahead } from 'react-bootstrap-typeahead';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import { useAddMemberMutation } from '../../services/members';
import { useGetMembersQuery, useModifyMemberMutation } from '../../services/members';


function AddTransfer({ onAddTransfer }) {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();

  const [show, setShow] = useState(false);
  const [transfered, setTransfered] = useState('');
  const [person, setPerson] = useState(null);
  const [dataTransfer, setDataTransfer] = useState('');
  const [bisericaTransfer, setBisericaTransfer] = useState('');
  const [actTransfer, setActTransfer] = useState('');
  const [detalii, setDetalii] = useState('');


  const handleClose = () => setShow(false);

  const addData = () => {
    const newTransfer = {
      dataTransfer: dataTransfer,
      bisericaTransfer: bisericaTransfer,
      actTransfer: actTransfer,
      detalii: detalii,
      person: person,
    }
    if (person) {
      setBisericaTransfer("")
      setActTransfer("")
      setDataTransfer("")
      setDetalii("")
      setShow(false)
      setPerson(null)
      onAddTransfer(newTransfer)
    }
    // console.log(onAddTransfer);
  };


  const onTrasferedChange = (p) => {
    if (p.length > 0) {
      setPerson(p[0]);
      console.log(p[0]);
    } else {
      setPerson(null);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Adauga transfer
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer din Biserica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <InputGroup size="sm" className="mb-3" >
              <div style={{ display: 'flex' }}>
                <InputGroup.Text id="inputGroup-sizing-sm">Persoana pt. transfer</InputGroup.Text>
                <Typeahead
                  id="transfered"
                  onChange={onTrasferedChange}
                  labelKey={option => `${option.firstName} ${option.lastName}`}
                  options={persoane || []}
                  placeholder="Alege o persoana..."
                  selected={persoane?.filter(p => p.id === person?.id) || []}
                />
              </div>
            </InputGroup>
          </Col>
          <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <InputGroup.Text id="inputGroup-sizing-sm">Data Transferului</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              as={DatePicker}
              selected={dataTransfer}
              onChange={(date) => setDataTransfer(date)}
              peekNextMonth
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Transferat in Biserica</InputGroup.Text>
            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              value={bisericaTransfer}
              onChange={(event) => setBisericaTransfer(event.target.value)} />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Nr. Act de transfer</InputGroup.Text>
            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              value={actTransfer}
              onChange={(event) => setActTransfer(event.target.value)} />
          </InputGroup>


          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Detalii</InputGroup.Text>
            <Form.Control as="textarea" rows={3}  aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              value={detalii}
              onChange={(event) => setDetalii(event.target.value)} />
          </InputGroup>

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
}

export default AddTransfer;