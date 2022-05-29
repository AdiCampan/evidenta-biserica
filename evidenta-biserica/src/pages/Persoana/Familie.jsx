import React, { useState, useRef, useEffect } from 'react';
import { Card, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useGetMembersQuery, useModifyMemberMutation } from '../../services/members';
import Copil from './Copil';
import Confirmation from '../../Confirmation';

function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

console.log(uuid());

const Familie = ({ dataUpdated, data }) => {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [pereche, setPereche] = useState('');
  const [servCivil, setServCivil] = useState('');
  const [servRel, setServRel] = useState('');
  const [biserica, setBiserica] = useState('');
  const [copil, setCopil] = useState('');
  const [dataNasteriiCopil, setDataNasteriiCopil] = useState('');
  const [sexCopil, setSexCopil] = useState('');
  const [childList, setChildList] = useState([])
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    dataUpdated({
      id: data.id,
      partner: pereche,
      civilWeddingDate: servCivil,
      religious: servRel,
      weddingChurch: biserica,
      child: copil,
      birthDate: dataNasteriiCopil,
      sex: sexCopil,
    });
  }, [pereche, servCivil, servRel, biserica, copil, dataNasteriiCopil]);

  

  useEffect(() => {
    setServCivil(data?.civil || '');
    setServRel(data?.religious || '');
    setBiserica(data?.weddingChurch || '');
    setCopil(data?.child || '');
    setDataNasteriiCopil(data?.birthDate || '');
    setSexCopil(data?.sex || '');
    setPereche(data?.relations[0]?.person || '');
  }, [data]);

  const onPersonChange = (persons) => {
    if (persons.length > 0) {
      setPereche(persons[0].id);
    } else {
      setPereche('');
    }
  }

  

  const addChildField = () => {
    setChildList([
      ...childList,
      { childId: '', index: uuid() }
    ]);
  }

  const updateChild = (childId, index) => {
    setChildList(childList.map((currentChild) => {
      if (index === currentChild.index) {
        return { childId, index: currentChild.index };
      }
      return currentChild;
    }));

  }

  const removeChild = (childIndex) => {
    setChildList(childList.filter((child) => {
      if (child.index !== childIndex) {
        return true;

      }
      setIdToDelete(null);
      return false;
    }));
  }

  useEffect(() => {
  }, [childList])

  return (
    <Container>
      <Card>Sot/Sotie
        <Row>
          <Col>
            <InputGroup size="sm" className="mb-3">
              <div style={{ display: 'flex' }}>
                <InputGroup.Text id="inputGroup-sizing-sm">Sot/Sotie</InputGroup.Text>
                <Typeahead
                  id="pereche"
                  onChange={onPersonChange}
                  labelKey={option => `${option.firstName} ${option.lastName}`}
                  options={persoane || []}
                  placeholder="Alege o persoana..."
                  selected={persoane?.filter(person => person.id === pereche) || []}
                />
              </div>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
              <InputGroup.Text id="inputGroup-sizing-sm">Data Serv. Civil</InputGroup.Text>
              <DatePicker
                selected={servCivil}
                onChange={(date) => setServCivil(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
              <InputGroup.Text id="inputGroup-sizing-sm">Data Serv.Rel.</InputGroup.Text>
              <DatePicker
                selected={servRel}
                onChange={(date) => setServRel(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">Efectuat in Biserica</InputGroup.Text>
              <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                onChange={(event) => setBiserica(event.target.value)} value={biserica} />
            </InputGroup>
          </Col>
        </Row>
      </Card><br /><br />

      <Card>Copii
        <Col>
          <InputGroup size="sm" className="mb-3">
            <Button onClick={addChildField}>Adauga un copil</Button>
          </InputGroup>
        </Col>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nume si Prenume</th>
              <th>Data Nasterii</th>
              <th>Varsta</th>
              <th>Sex</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {childList.map((childItem) => (
                <Copil
                  childUpdated={(childId) => updateChild(childId, childItem.index)}
                  removeChild={() => setIdToDelete(childItem.index)}
                  key={childItem.index}
                />
              ))}
            <td>{}</td>
            <td>{}</td>
            <td>{sexCopil}</td>
              
            </tr>
            <tr>{}</tr>


          </tbody>
        </Table>

      </Card>
      <Confirmation
        showModal={idToDelete != null}
        id={idToDelete}
        confirmModal={(id) => removeChild(id)}
        message="Esti sigur ca vrei sa stergi copilul din baza de date ?"
        hideModal={() => setIdToDelete(null)}
      />
    </Container>
  )
};
export default Familie;