
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useRef, useEffect } from 'react';
import { useGetMemberQuery, useModifyMemberMutation } from '../../services/members';
import { Card } from 'react-bootstrap';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import DatePicker from 'react-datepicker';
import FileUploader from '../../features/FileUploader';
import "./Persoana.css";


function Persoana() {



  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);

  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useGetMemberQuery(id);
  const [modifyMember, result] = useModifyMemberMutation();

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
  const [blessingDate, setBlessingDate] = useState(null);
  const [blessingPlace, setBlessingPLace] = useState('');
  const [baptiseDate, setBaptiseDate] = useState(null);
  const [baptisePlace, setBaptisePlace] = useState('')
  const [dsBotezDate, setDsBotezDate] = useState(null);
  const [dsBotezPlace, setDsBotezPlace] = useState('');
  const [membruData, setMembruData] = useState(null);
  const [detalii, setDetalii] = useState('');

  // actualizeaza datele la save, de ex
  useEffect(() => {
    setNume(data?.firstName);
    setPrenume(data?.lastName);
    setAnterior(data?.maidenName);
    setAdresa(data?.address);
    setTelefon(data?.mobilePhone);
    setEmail(data?.email);
    setSex(data?.sex === true ? 'M' : (data?.sex === false ? 'F' : null));
    setFather(data?.fatherName);
    setMother(data?.motherName);
    setEnterBirthDate(Date.parse(data?.birthDate));
    setPlaceOfBirth(data?.placeOfBirth);
    setBlessingDate(data?.blessingDate);
    setBlessingPLace(data?.blessingPlace);
    setBaptiseDate(Date.parse(data?.baptiseDate));
    setBaptisePlace(data?.baptisePlace);
    setDsBotezDate(data?.hsBaptiseDate);
    setDsBotezPlace(data?.hsBaptisePlace);
    setMembruData(data?.memberdate);
    setDetalii(data?.details);
  }, [data]);


  const saveData = () => {
    const newPerson = {
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
      blessingDate: blessingDate,
      blessingPlace: blessingPlace,
      baptiseDate: baptiseDate,
      baptisePlace: baptisePlace,
      hsBaptiseDate: dsBotezDate,
      hsBaptisePlace: dsBotezPlace,
      memberdate: membruData,
      details: detalii,
    };
    if (nume != "" && prenume != "") {
      modifyMember(newPerson);
    }
    else {
      alert("Nu stergeti numele sau prenumele !")
    };
  };

  return (
    <Card>
      <Card.Body>
        <Form>
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
                    <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                      <InputGroup.Text >Membru începând cu data </InputGroup.Text>
                      <DatePicker
                        selected={membruData}
                        onChange={(date) => setMembruData(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </InputGroup>
                  </Col>
                  </Row>



              </Col>


              <Col>
                <Card>
                  <Card.Img variant="top" src="assets/images/desk.png" />
                  <Card.Body>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk
                      of the card's content.Some quick example text to build on the card title and make up the bulk
                      of the card's content.Some quick example text to build on the card title and make up the bulk
                      of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>

                <form>
                  <FileUploader
                    onFileSelectSuccess={(file) => setSelectedFile(file)}
                  // onFileSelectError={({ error }) => alert(error)}
                  />
                  {/* <button onClick={submitForm}>Submit</button> */}
                </form>
                <Row>
                  <Col>
                    <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                      <InputGroup.Text id="inputGroup-sizing-sm">Data Binecuvântării</InputGroup.Text>
                      <DatePicker
                        selected={blessingDate}
                        onChange={(date) => setBlessingDate(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                      <InputGroup.Text id="inputGroup-sizing-sm">Locul Binecuvântării</InputGroup.Text>
                      <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                      value={blessingPlace}
                      onChange={(event) => setBlessingPLace(event.target.value)} />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                      <InputGroup.Text id="inputGroup-sizing-sm">Data Botezului</InputGroup.Text>
                      <DatePicker
                        selected={baptiseDate}
                        onChange={(date) => setBaptiseDate(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                      <InputGroup.Text id="inputGroup-sizing-sm">Locul botezului</InputGroup.Text>
                      <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                      value={baptisePlace}
                      onChange={(event) => setBaptisePlace(event.target.value)} />
                    </InputGroup>
                  </Col>
                </Row>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Botez efectuat de :</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <Row>
                  <Col>
                    <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                      <InputGroup.Text id="inputGroup-sizing-sm">Botezat cu Duh Sfânt</InputGroup.Text>
                      <DatePicker
                        selected={dsBotezDate}
                        onChange={(date) => setDsBotezDate(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                      <InputGroup.Text id="inputGroup-sizing-sm">Locul</InputGroup.Text>
                      <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                      value={dsBotezPlace}
                      onChange={(event) => setDsBotezPlace(event.target.value)} />
                    </InputGroup>
                  </Col>
                </Row>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">DETALII <br/>Observatii</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    value={detalii}
                    onChange={(event) => setDetalii(event.target.value)} />
                </InputGroup>

              </Col>
            </Row>
          </Container>
          <Button variant="primary" type="button" onClick={saveData}>
            Salveaza
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Persoana