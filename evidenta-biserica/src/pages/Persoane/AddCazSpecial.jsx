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
import { v4 as uuid } from 'uuid';
import { useAddMemberMutation } from '../../services/members';
import { useGetMembersQuery, useModifyMemberMutation } from '../../services/members';


function AddCazSpecial({ onAddCaz }) {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();

  const [show, setShow] = useState(false);
  const [transfered, setTransfered] = useState('');
  const [person, setPerson] = useState(null);
  const [dataOpencase, setDataOpenCase] = useState('');
  const [detalii, setDetalii] = useState('');


  const handleClose = () => setShow(false);

  const addData = () => {
    const newCase = {
      id: uuid(),
      dataOpenCase: dataOpencase,
      detalii: detalii,
      person: person,
      resolved: false,
    }
    if (person) {
      
      setDataOpenCase("")
      setDetalii("")
      setShow(false)
      setPerson(null)
      onAddCaz(newCase)
      
    }
  };


  const onCaseChange = (p) => {
    if (p.length > 0) {
      setPerson(p[0]);
    } else {
      setPerson(null);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Adauga un Caz Special
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Caz Special</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <InputGroup size="sm" className="mb-3" >
              <div style={{ display: 'flex' }}>
                <InputGroup.Text id="inputGroup-sizing-sm">Persoana </InputGroup.Text>
                <Typeahead
                  id="transfered"
                  onChange={onCaseChange}
                  labelKey={option => `${option.firstName} ${option.lastName}`}
                  options={persoane || []}
                  placeholder="Alege o persoana..."
                  selected={persoane?.filter(p => p.id === person?.id) || []}
                />
              </div>
            </InputGroup>
          </Col>
          <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <InputGroup.Text id="inputGroup-sizing-sm">Data deschiderii Cazului</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              as={DatePicker}
              selected={dataOpencase}
              onChange={(date) => setDataOpenCase(date)}
              peekNextMonth
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"></InputGroup.Text>
            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
           />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"></InputGroup.Text>
            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              />
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

export default AddCazSpecial;