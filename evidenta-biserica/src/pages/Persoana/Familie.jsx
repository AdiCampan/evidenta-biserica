import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Typeahead } from 'react-bootstrap-typeahead';
import AddPerson from '../AddPerson';
import { useGetMembersQuery, useModifyMemberMutation } from '../../services/members';

const Familie = ({ dataUpdated, data }) => {
  const { id } = useParams();
  const [modifyMember, result] = useModifyMemberMutation();
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();


  const [pereche, setPereche] = useState('');
  const [servCivil, setServCivil] = useState('');
  const [servRel, setServRel] = useState('');
  const [biserica, setBiserica] = useState('');
  const [copil, setCopil] = useState('');
  const [dataNasteriiCopil, setDataNasteriiCopil] = useState('');
  const [copii, setCopii] = useState([]);



  useEffect(() => {
    dataUpdated({
      id: data.id,
      partner: pereche,
      civilWeddingDate: servCivil,
      religious: servRel,
      weddingChurch: biserica,
      child: copil,
      childBirthDate: dataNasteriiCopil,
    });
  }, [pereche, servCivil, servRel, biserica, copil, dataNasteriiCopil]);

  useEffect(() => {
    // setPereche(data?.partner);
    setServCivil(data?.civil || '');
    setServRel(data?.religious || '');
    setBiserica(data?.weddingChurch || '');
    setCopil(data?.child || '');
    setDataNasteriiCopil(data?.childBirthDate || '');
    setPereche(data?.relations[0]?.person || '');
  }, [data]);

  const onPersonChange = (persons) => {
    if (persons.length > 0) {
      setPereche(persons[0].id);
    } else {
      setPereche('');
    }
  }
   
  const onCopilChange = (person) => {
    if (person.length > 0) {
      setCopil(person[0].id);
    } else {
      setCopil('');
    }
  }


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
                  selected={persoane?.filter(person => person.id === pereche ) || []}
                />
                <AddPerson onAdded={(personId) => setPereche(personId)} />
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

      </Card><br /><br /><br />
      <Card>Copii
        <div><AddPerson onAddChild={(personId) => setCopil(personId)}/></div>
        <Row>
          <Col>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">Nume si Prenume</InputGroup.Text>
              <Typeahead
                  id="copil"
                  onChange={onCopilChange}
                  labelKey={option => `${option.firstName} ${option.lastName}`}
                  options={persoane || []}
                  placeholder="Alege o persoana..."
                  selected={persoane?.filter(person => person.id === copil ) || []}
                />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
              <InputGroup.Text id="inputGroup-sizing-sm">Data Nasterii</InputGroup.Text>
              <DatePicker
                selected={dataNasteriiCopil}
                onChange={(date) => setDataNasteriiCopil(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </InputGroup>
          </Col>
        </Row>
      </Card>
    </Container>
  )
};
export default Familie;