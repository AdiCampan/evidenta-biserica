import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGetMemberQuery, useModifyMemberMutation } from '../../services/members';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import DatePicker from 'react-datepicker';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import "./Persoana.css";


const General = ({ dataUpdated, data }) => {
  const { id } = useParams();
  const [modifyMember, result] = useModifyMemberMutation();

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
    
  }, [nume, prenume, anterior, adresa, telefon, email, sex, father, mother, placeOfBirth, enterBirthDate, member, detalii, selectedFile]);

  useEffect(() => {
    setNume(data?.firstName || '');
    setPrenume(data?.lastName || '');
    setAnterior(data?.maidenName || '');
    setAdresa(data?.address || '');
    setTelefon(data?.mobilePhone || '');
    setEmail(data?.email || '');
    setSex(data?.sex === true ? 'M' : (data?.sex === false ? 'F' : null));
    setFather(data?.fatherName || '');
    setMother(data?.motherName || '');
    setEnterBirthDate(Date.parse(data?.birthDate));
    setPlaceOfBirth(data?.placeOfBirth || '');
    setMembruData(Date.parse(data?.memberDate));
    setDetalii(data?.details || '');
    setProfileImage(data?.imagePath);
  }, [data]);

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
                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  value={father}
                  onChange={(event) => setFather(event.target.value)} />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Mama</InputGroup.Text>
                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  value={mother}
                  onChange={(event) => setMother(event.target.value)} />
              </InputGroup>
            </Col>


          </Row>
          <Row>
            <Col>
              <InputGroup size="sm" className="mb-3">

                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Membru"
                  value={member}
                  onChange={(e) => setMember(e.target.checked)}
                />
              </InputGroup>
              {member && (<InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <InputGroup.Text >Membru începând cu data </InputGroup.Text>
                <DatePicker
                  selected={membruData}
                  onChange={(date) => setMembruData(date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </InputGroup>)}
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
    </Container>
  );
};

export default General;
