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



const Familie = ({ dataUpdated, data }) => {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [pereche, setPereche] = useState('');
  const [servCivil, setServCivil] = useState('');
  const [servRel, setServRel] = useState('');
  const [biserica, setBiserica] = useState('');
  const [copil, setCopil] = useState('');
  const [dataNasteriiCopil, setDataNasteriiCopil] = useState('');
  const [sexCopil, setSexCopil] = useState('');
  const [childList, setChildList] = useState(data.relations.filter(relation => relation.type === 'child').map(child => ({
    childId: child.person,
    index: child.id
  })));
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    let partener = {};

    if (pereche.length > 0) {
      partener = {
        person: pereche,
        type: data.sex ? 'wife' : 'husband',
        civilWeddingDate: servCivil,
        religiousWeddingDate: servRel,
        weddingChurch: biserica,        
      }
    }
    const children = childList.filter(child => child.childId.length > 0).map(child => ({
      person: child.childId,
      type: 'child'
    }));

    console.log('child list', children);

    dataUpdated({
      relations: [
        partener,
        ...children,
      ]
    });
  }, [pereche, servCivil, servRel, biserica, childList, dataNasteriiCopil]);



  useEffect(() => {
    const spouse = data.relations.find(relation => relation.type === 'wife' || relation.type === 'husband');

    setServCivil(spouse?.civilWeddingDate ? new Date(spouse?.civilWeddingDate) : '');
    setServRel(spouse?.religiousWeddingDate ? new Date(spouse?.religiousWeddingDate) : '');
    setBiserica(spouse?.weddingChurch || '');
    setDataNasteriiCopil(data?.birthDate || '');
    setSexCopil(data?.sex || '');
    setPereche(data.relations.find(relation => relation.type === 'wife' || relation.type === 'husband')?.person || '');
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
                  options={persoane?.filter(person => data.sex !== person.sex) || []}
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
                maxDate={new Date()}
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
                maxDate={new Date()}
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
              {childList.map((childItem) => (
                <Copil
                  childUpdated={(childId) => updateChild(childId, childItem.index)}
                  removeChild={() => setIdToDelete(childItem.index)}
                  key={childItem.index}
                  selected={childItem.childId}
                />
              ))}
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