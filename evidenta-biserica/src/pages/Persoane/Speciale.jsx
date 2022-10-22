import { useState, useEffect } from 'react'
import { Card, FormControl } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
import { useGetSpecialCasesQuery, useModifySpecialCaseMutation, useDelSpecialCaseMutation } from '../../services/specialCases';
import { useGetMembersQuery, useModifyMemberMutation,  } from '../../services/members';

const FILTER_LABEL = {
  '1': 'Exclus temporar',
  '2': 'Exclus defintiv',
}

function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const Speciale = () => {

  const [filterType, setFilterType] = useState('1');
  const [cazuri, setCazuri] = useState([]);
  const [dataOpencase, setDataOpenCase] = useState('');
  const [dataRezolvarii, setDataRezolvarii] = useState("");
  const [dataExcluderii, setDataExcluderii] = useState("");
  const [detalii, setDetalii] = useState("")
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [show, setShow] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [caseToEdit, setCaseToEdit] = useState(null);
  const [delSpecialCase] = useDelSpecialCaseMutation();

  const { data: cazuriSpeciale, isLoading: cazuriSpecialeLoading } = useGetSpecialCasesQuery();
  const [modifySpecialCase] = useModifySpecialCaseMutation();
  const [modifyMember] = useModifyMemberMutation();
  const { data: persoane, isLoading: persoaneLoading } = useGetMembersQuery();

  useEffect(() => {
    if (!cazuriSpecialeLoading && !persoaneLoading) {
      setCazuri(cazuriSpeciale.map(cazSpecial => {
        return {
          ...cazSpecial,
          person: persoane.find(person => person.id === cazSpecial.person)
        }
      }));
    }
  }, [persoane, cazuriSpeciale]);

  const editar = caz => {
    setShow(true)
    setDataRezolvarii(caz.endDate)
    setDataOpenCase(caz.startDate)
    setDataExcluderii(caz.person.leaveDate)
    setDetalii(caz.details)
    setIdToEdit(caz.id)
    setCaseToEdit(caz)
  }

  const handleUpdate = () => {
    const cazulModificat = {
      id: caseToEdit.id,
      startDate: dataOpencase,
      endDate: dataRezolvarii,
      details: detalii,
    };

    modifySpecialCase(cazulModificat);
    // exclus definitiv, deci facem un transfer
    if (filterType === '2') {
      modifyMember({
        id: caseToEdit.person.id,
        leaveDate: dataExcluderii,
        memberDate: ""
      });
    }
    setShow(false);
  }

  const handleClose = () => setShow(false);

  const addCaz = (caz) => {
    const cazuriActualizate = [...cazuri, caz];
  };


  const deleteCase = (cazIndex) => {
    delSpecialCase(idToDelete)
    console.log(idToDelete, cazIndex);
      setIdToDelete(null);
  }

  const showDeleteModal = (personId, ev) => {
    setIdToDelete(personId);
    ev.stopPropagation();
  }

  return (
    <div>
      <Col>
        <InputGroup size="sm" className="mb-3">
          <AddCazSpecial onAddCaz={addCaz} />
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
              <tr key={caz.id} style={{ backgroundColor: caz.endDate ? '#55bb5580' : '#af404038' }} >
                <td>{index + 1}</td>
                <td>{caz.person.firstName} {caz.person.lastName}</td>
                <td>{formatDate(caz.startDate)}</td>
                <td>{formatDate(caz.endDate)}</td>
                <td>{caz.details}</td>
                <td>{calculateAge(caz.person.birthDate)}</td>
                <td>
                  <FaRegEdit style={{ cursor: 'pointer' }} onClick={() => editar(caz)} />
                </td>
                <td>
                  <FaTrash 
                  style={{ cursor: 'pointer' }} 
                  onClick={(event) => showDeleteModal(caz.id, event)} />
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
              selected={caseToEdit?.startDate ? new Date(caseToEdit?.startDate) : null}
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
              selected={dataRezolvarii ? new Date(dataRezolvarii) : null}
              onChange={(date) => setDataRezolvarii(date)}
              peekNextMonth
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Selecteaza tipul excluderii:</InputGroup.Text>
            {[DropdownButton].map((DropdownType, idx) => (
              <DropdownType
                as={ButtonGroup}
                key={idx}
                id={`dropdown-button-drop-${idx}`}
                size="sm"
                variant="secondary"
                title={FILTER_LABEL[filterType]}
                onSelect={(key) => setFilterType(key)}
              >
                <Dropdown.Item eventKey="1">Exclus temporar</Dropdown.Item>
                <Dropdown.Item eventKey="2">Exclus dfinitiv</Dropdown.Item>
              </DropdownType>
            ))}
          </InputGroup>

          <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <InputGroup.Text id="inputGroup-sizing-sm">Data excluderii</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              as={DatePicker}
              selected={dataExcluderii ? new Date(dataExcluderii) : null}
              onChange={(date) => setDataExcluderii(date)}
              peekNextMonth
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" aria-describedby="inputGroup-sizing-sm"
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
            Salveaza
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