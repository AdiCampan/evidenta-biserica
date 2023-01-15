import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGetMemberQuery, useGetMembersQuery, useModifyMemberMutation } from '../../services/members';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import DatePicker from 'react-datepicker';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import AddTransferModal from '../Persoane/AddTransferModal';

import "./Persoana.css";
import AddPerson from '../Persoane/AddPerson';
import { Typeahead } from 'react-bootstrap-typeahead';


const General = ({ dataUpdated, data }) => {
  const { id } = useParams();
  const [modifyMember, result] = useModifyMemberMutation();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();

  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [anterior, setAnterior] = useState('');
  const [adresa, setAdresa] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState(null);
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [enterBirthDate, setEnterBirthDate] = useState(null);
  const [member, setMember] = useState(false);
  const [membruData, setMembruData] = useState(null);
  const [detalii, setDetalii] = useState('');

  useEffect(() => {
    dataUpdated({
      id: data.id,
      firstName: nume,
      lastName: prenume,
      maidenName: anterior,
      address: adresa,
      mobilePhone: telefon,
      email: email,
      sex: sex === 'M' ? true : (sex === 'F' ? false : null),
      fatherName: father,
      motherName: mother,
      birthDate: enterBirthDate,
      placeOfBirth: placeOfBirth,
      memberDate: membruData,
      details: detalii,
      profileImage: selectedFile,
    });

  }, [nume, prenume, anterior, adresa, telefon, email, sex, father, mother, placeOfBirth, enterBirthDate, member, detalii, selectedFile, membruData]);

  useEffect(() => {
    if (data) {
      setNume(data.firstName || '');
      setPrenume(data.lastName || '');
      setAnterior(data.maidenName || '');
      setAdresa(data.address || '');
      setTelefon(data.mobilePhone || '');
      setEmail(data.email || '');
      setSex(data.sex === true ? 'M' : (data.sex === false ? 'F' : null));
      setFather(data.fatherName || '');
      setMother(data.motherName || '');
      setEnterBirthDate(Date.parse(data.birthDate));
      setPlaceOfBirth(data.placeOfBirth || '');
      setMembruData(data.memberDate ? Date.parse(data.memberDate) : null);
      setMember(!!data.memberDate);
      setDetalii(data.details || '');
      setProfileImage(data.imagePath);
    }
  }, [data]);

  const addTransfer = () => { };

  const onFatherdChange = (p) => {
    if (p.length > 0) {
      setFather(p[0]);
    } else {
      setFather(null);
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Nume</InputGroup.Text>
                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  onChange={(event) => setNume(event.target.value)} value={nume} />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Prenume</InputGroup.Text>
                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  value={prenume}
                  onChange={(event) => setPrenume(event.target.value)} />
              </InputGroup>
            </Col>

          </Row>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Nume anterior</InputGroup.Text>
            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              value={anterior}
              onChange={(event) => setAnterior(event.target.value)} />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Adresa</InputGroup.Text>
            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              value={adresa}
              onChange={(event) => setAdresa(event.target.value)} />
          </InputGroup>
          <Row>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Telefon</InputGroup.Text>
                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  onChange={(event) => setTelefon(event.target.value)} value={telefon} />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">email</InputGroup.Text>
                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  onChange={(event) => setEmail(event.target.value)} value={email} />
              </InputGroup>
            </Col>
          </Row>


          <Row>
            <Col>
              <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <InputGroup.Text >Data nasterii</InputGroup.Text>
                <DatePicker
                  selected={enterBirthDate}
                  onChange={(date) => setEnterBirthDate(date)}
                  peekNextMonth
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Locul nasterii</InputGroup.Text>
                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  value={placeOfBirth}
                  onChange={(event) => setPlaceOfBirth(event.target.value)} />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Sexul</InputGroup.Text>
            <RadioGroup
              style={{ display: 'flex', flexDirection: 'row', paddingLeft: 14 }}
              name="use-radio-group"
              value={sex}
              onChange={(e) => { console.log('valoare', e); setSex(e.target.value) }}
            >
              <FormControlLabel value="M" label="Masculin" control={<Radio />} />
              <FormControlLabel value="F" label="Feminin" control={<Radio />} />
            </RadioGroup>
          </InputGroup>
          <Row>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Tata</InputGroup.Text>
                <Typeahead
                  onChange={onFatherdChange}
                  labelKey={option => `${option.firstName} ${option.lastName}`}
                  options={persoane || []}
                  placeholder="Alege tatal..."
                // selected={persoane?.filter(p => p.id === person?.id) || []}
                />
                <AddPerson label="+" />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Mama</InputGroup.Text>
                <Typeahead
                  labelKey={option => `${option.firstName} ${option.lastName}`}
                  options={persoane || []}
                  placeholder="Alege mama..."
                  id="mama"
                  onChange={onFatherdChange}
                />
                <AddPerson label="+" />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {membruData && (<InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <InputGroup.Text >Membru începând cu data </InputGroup.Text>
                <DatePicker
                  selected={membruData}
                  onChange={(date) => setMembruData(date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  disabled
                  dropdownMode="select"
                />
              </InputGroup>)}
            </Col>
            <Col>
              <Button variant="danger" type="button" onClick={() => setShowTransferModal(true)}>
                Transfer
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>

          <ImageUploader
            onFileSelectSuccess={(file) => setSelectedFile(file)}
            onFileSelectError={({ error }) => alert(error)}
            initialImage={profileImage}
          />
        </Col>
      </Row>
      <AddTransferModal
        isDisabled
        onAddTransfer={addTransfer}
        show={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        transferredPerson={data}
      />
    </Container>
  );
};

export default General;
