import { Typeahead } from 'react-bootstrap-typeahead';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import { useGetMembersQuery } from '../../services/members';
import { useAddSpecialCaseMutation } from '../../services/specialCases';
import { useGetSpecialCasesQuery } from '../../services/specialCases';

function AddCazSpecial({ onAddCaz }) {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const { data: cazuriSpeciale, isLoading: cazuriSpecialeLoading } = useGetSpecialCasesQuery();

  const [show, setShow] = useState(false);
  const [person, setPerson] = useState(null);
  const [dataOpencase, setDataOpenCase] = useState('');
  const [detalii, setDetalii] = useState('');

  const [addSpecialCase, result] = useAddSpecialCaseMutation();
  const handleClose = () => setShow(false);

  const addData = () => {
    const newCase = {
      startDate: dataOpencase,
      details: detalii,
      person: person.id,
    }
    if (person) {
      
      setDataOpenCase("")
      setDetalii("")
      setShow(false)
      setPerson(null)
      onAddCaz(newCase)
      addSpecialCase(newCase);
    }
  };


  const onCaseChange = (p) => {
    if (p.length > 0) {
      setPerson(p[0]);
    } else {
      setPerson(null);
    }
  }

  const filterSpecialCases = (person) => {
    if(cazuriSpeciale?.find(caz => caz.person === person.id)) {
      return false;
    }
    return true;
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
                  options={persoane?.filter(filterSpecialCases) ||  []}
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