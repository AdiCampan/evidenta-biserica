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


  const [pereche, setPereche] = useState([]);
  const [servCivil, setServCivil] = useState('');
  const [servRel, setServRel] = useState('');
  const [biserica, setBiserica] = useState('');
  const [copil, setCopil] = useState('');
  const [dataNasteriiCopil, setDataNasteriiCopil] = useState('');



  useEffect(() => {
    dataUpdated({
      id: data.id,
      partner: pereche,
      civil: servCivil,
      religious: servRel,
      weddingChurch: biserica,
      child: copil,
      childBirthDate: dataNasteriiCopil,
    });
  }, [pereche, servCivil, servRel, biserica, copil, dataNasteriiCopil]);

  useEffect(() => {
    setPereche(data?.partner);
    setServCivil(data?.civil);
    setServRel(data?.religious);
    setBiserica(data?.weddingChurch);
    setCopil(data?.child);
    setDataNasteriiCopil(data?.childBirthDate);


  }, [data]);


  return (
    <Container>
      <Card>Sot/Sotie
        <Row>
          <Col>
            <InputGroup size="sm" className="mb-3">
              <div style={{ display: 'flex' }}>
                <InputGroup.Text id="inputGroup-sizing-sm">Sot/Sotie</InputGroup.Text>
                <Typeahead
                  onChange={setPereche}
                  options={persoane?.map(persoana => `${persoana.firstName} ${persoana.lastName}`)}
                  placeholder="Alege o persoana..."
                  selected={pereche}
                /> <AddPerson />
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
        <div><AddPerson /></div>
        <Row>
          <Col>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">NUme si Prenume</InputGroup.Text>
              <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                onChange={(event) => setCopil(event.target.value)} value={copil} />
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