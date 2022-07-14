import { useState, useEffect } from 'react'
import { Card, FormControl } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Confirmation from '../../Confirmation';
import AddCazSpecial from './AddCazSpecial';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import {
  calculateAge, formatDate, searchField, filterByText, filterByAgeSmaller,
  filterByAge, filterByAgeGreater, filterByDate, filterBySex
} from '../../utils';

const AGE_FILTER_LABEL = {
  '1': '>=',
  '2': '<=',
  '3': '=',
  '4': '< >'
}

function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const Speciale = () => {

 
  const [cazuri, setCazuri] = useState([]);
  const [dataOpencase, setDataOpenCase] = useState('');
  const [dataRezolvarii, setDataRezolvarii] = useState("");
  const [detalii, setDetalii] = useState("")
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [show, setShow] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [caseToEdit,setCaseToEdit] = useState(null);

  const editar = caz => {
    setShow(true)
    setDataOpenCase(caz.dataOpenCase)
    setDataRezolvarii(caz.dataRezolvarii)
    setDetalii(caz.detalii)
    setIdToEdit(caz.id)
    setCaseToEdit(caz)
  }

  const handleUpdate = () => {
      const cazulModificat = {
        ...caseToEdit,
        dataOpenCase: dataOpencase,
        dataResolvedCase: dataRezolvarii,
        detalii: detalii,
      };
      
      setCazuri(cazuri.map(caz => {
        if (caz.id === cazulModificat.id) {
          caz = cazulModificat;
         
          setShow(false)
        }
        return caz;
      }));
  }

  
  const handleRezolve = () => {
        
    const cazulModificat = {
      ...caseToEdit,
      dataResolvedCase: dataRezolvarii,
      resolved: true
    };

    setCazuri(cazuri.map(caz => {
      if (caz.id === cazulModificat.id) {
        caz = cazulModificat
        
        setShow(false)
      }
      return caz;
    }));
  }

  const handleClose = () => setShow(false);

  const addCaz = (caz) => {
    const cazuriActualizate = [...cazuri, caz];
    setCazuri(cazuriActualizate)
  };


  const deleteCase = (cazIndex) => {

    setCazuri(cazuri.filter((caz) => {
      if (caz.person.id !== cazIndex) {
        return true;
      }
      setIdToDelete(null);
      return false;
    }));
  }

  const showDeleteModal = (personId, ev) => {
    setIdToDelete(personId);
    ev.stopPropagation();
  }

  return (
    <div>
      <Col>
        <InputGroup size="sm" className="mb-3">
          <AddCazSpecial  onAddCaz={addCaz} />
        </InputGroup>
      </Col>
      <Card>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nume si Prenume</th>
              <th>Data Deschiderii</th>
              <th>Data Rezolvarii</th>
              <th>Detalii Caz Special</th>
              <th>Varsta</th>
            </tr>
          </thead>
          <tbody>
            {cazuri.map((caz, index) => (
              <tr key={caz.id} style={{ backgroundColor: caz.resolved ? '#7ceb0f57' : '#af404038' }} >
                <td>{index + 1}</td>
                <td>{caz.person.firstName} {caz.person.lastName}</td>
                <td>{formatDate(caz.dataOpenCase)}</td>
                <td>{formatDate(caz.dataResolvedCase)}</td>
                <td>{caz.detalii}</td>
                <td>{calculateAge(caz.person.birthDate)}</td>
                <td>
                  <FaRegEdit style={{ cursor: 'pointer' }} onClick={() => editar(caz)} />
                </td>
                <td>
                  <FaTrash style={{ cursor: 'pointer' }} onClick={(event) => showDeleteModal(caz.person.id, event)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editare Caz Special</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm"> Nume </InputGroup.Text>
              <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                value={caseToEdit?.person.firstName}
                disabled
              />
              <InputGroup.Text id="inputGroup-sizing-sm"> Prenume </InputGroup.Text>
              <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                value={caseToEdit?.person.lastName}
                disabled
              />
            </InputGroup>

          </Col>
          <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <InputGroup.Text id="inputGroup-sizing-sm">Data deschiderii Cazului</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              as={DatePicker}
              selected={dataOpencase}
              // onChange={(date) => setDataOpenCase(date)}
              disabled
              peekNextMonth
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <InputGroup.Text id="inputGroup-sizing-sm">Data Rezolvarii Cazului</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              as={DatePicker}
              selected={dataRezolvarii}
              onChange={(date) => setDataRezolvarii(date)}
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
            <Form.Control as="textarea" rows={3} aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              value={detalii}
              onChange={(event) => setDetalii(event.target.value)}
            />
          </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizare
          </Button>
          <Button variant="primary" onClick={handleRezolve}>
            Rezolvare
          </Button>
        </Modal.Footer>
      </Modal>

      <Confirmation
        showModal={idToDelete != null}
        id={idToDelete}
        confirmModal={(id) => deleteCase(id)}
        message="Esti sigur ca vrei sa stergi Cazul Special din baza de date ?"
        hideModal={() => setIdToDelete(null)}
      />

    </div>
  )
}

export default Speciale