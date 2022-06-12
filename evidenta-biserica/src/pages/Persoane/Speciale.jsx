import { useState, useEffect } from 'react'
import { Card, FormControl } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import Caz_special from './Caz_special';
import Confirmation from '../../Confirmation';

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

  const [persoana, setPersoana] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [details, setDetails] = useState('');
  const [caseList, setCaseList] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [ageFilterType, setAgeFilterType] = useState('1');
  const [ageFilter, setAgeFilter] = useState('');
  const [ageFilterBetween, setAgeFilterBetween] = useState('');




  const addCaseField = () => {
    setCaseList([
      ...caseList,
      { caseId: '', index: uuid() }
    ]);
  }

  const updateCase = (caseId, index) => {
    setCaseList(caseList.map((currentCase) => {
      if (index === currentCase.index) {
        return { caseId, index: currentCase.index };
      }
      return currentCase;
    }));

  }

  const removeCase = (caseIndex) => {
    setCaseList(caseList.filter((caz) => {
      if (caz.index !== caseIndex) {
        return true;

      }
      setIdToDelete(null);
      return false;
    }));
  }

  useEffect(() => {
  }, [caseList])

  function filterMembers(members) {
    let filteredMembers = members;

    filteredMembers = filterByText(filteredMembers, 'firstName', firstNameFilter);
    filteredMembers = filterByText(filteredMembers, 'lastName', lastNameFilter);
    filteredMembers = filterByText(filteredMembers, 'address', addressFilter);
    filteredMembers = filterByText(filteredMembers, 'mobilePhone', telefonFilter);
    if (ageFilterType === '1' || ageFilterType === '4') { // >=
      filteredMembers = filterByAgeGreater(filteredMembers, 'birthDate', ageFilter);
    }
    if (ageFilterType === '2') { // <=
      filteredMembers = filterByAgeSmaller(filteredMembers, 'birthDate', ageFilter);
    }
    if (ageFilterType === '3') { // ==
      filteredMembers = filterByAge(filteredMembers, 'birthDate', ageFilter);
    }
    if (ageFilterType === '4') {
      filteredMembers = filterByAgeSmaller(filteredMembers, 'birthDate', ageFilterBetween);
    }
    filteredMembers = filterBySex(filteredMembers, sexFilter);

    return filteredMembers;
  }


  return (
    <div>
      Cazuri speciale
      <Card>
        <Col>
          <InputGroup size="sm" className="mb-3">
            <Button onClick={addCaseField}>Adauga un caz</Button>
          </InputGroup>
        </Col>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nume si Prenume</th>
              <th>Varsta</th>
              <th>Data deschiderii cazului</th>
              <th>Detalii</th>
            </tr>
          </thead>
          <tr>
            <td></td>
            <td>
            <div>
                  {[DropdownButton].map((DropdownType, idx) => (
                    <DropdownType
                      as={ButtonGroup}
                      key={idx}
                      id={`dropdown-button-drop-${idx}`}
                      size="sm"
                      variant="secondary"
                      title={AGE_FILTER_LABEL[ageFilterType]}
                      onSelect={(key) => setAgeFilterType(key)}
                    >
                      <Dropdown.Item eventKey="1">Peste sau egal cu...</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Sub sau egal cu...</Dropdown.Item>
                      <Dropdown.Item eventKey="3">Doar Cu varsta...</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="4">Intre varstele...</Dropdown.Item>
                    </DropdownType>
                  ))}
                </div>
            </td>
          </tr>
         
          <tbody>
            {caseList.map((caseItem) => (
              <Caz_special
                caseUpdated={(caseId) => updateCase(caseId, caseItem.index)}
                removeCase={() => setIdToDelete(caseItem.index)}
                key={caseItem.index}
              />
            ))}
          </tbody>
        </Table>
        <Confirmation
          showModal={idToDelete != null}
          id={idToDelete}
          confirmModal={(id) => removeCase(id)}
          message="Esti sigur ca vrei sa stergi cazul special din baza de date ?"
          hideModal={() => setIdToDelete(null)}
        />

      </Card>
    </div>
  )
}

export default Speciale