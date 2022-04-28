
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useRef, useEffect } from 'react';
import { useGetMemberQuery, useModifyMemberMutation } from '../services/members';
import { Card } from 'react-bootstrap';
import RadioButton from './RadioButton';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import DatePicker from 'react-datepicker';
import FileUploader from '../features/FileUploader';
import "react-datepicker/dist/react-datepicker.css";




function Persoana() {


 
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);

  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useGetMemberQuery(id);
  const [modifyMember, result] = useModifyMemberMutation();

  const [nume, setNume] = useState(data?.firstName);
  const [prenume, setPrenume] = useState(data?.lastName);
  const [adresa, setAdresa] = useState(data?.address);
  const [telefon, setTelefon] = useState(data?.mobilePhone);
  const [email, setEmail] = useState(data?.email);
  const [sex, setSex] = useState(data?.sex);
  const [father, setFather] = useState(data?.fatherName);
  const [mother, setMother] = useState(data?.motherName);
  const [birthDate, setBirthDate] = useState(data?.birthDate);
  const [placeOfBirth, setPlaceOfBirth] = useState(data?.placeOfBirth);

  const [enterBirthDate, setEnterBirthDate] = useState(new Date());
  const [baptiseDate, setBaptiseDate] = useState(new Date());

  useEffect(() => {
    setNume(data?.firstName);
    setPrenume(data?.lastName);
    setAdresa(data?.address);
    setTelefon(data?.mobilePhone);
    setEmail(data?.email);
    setSex(data?.sex);
    setFather(data?.fatherName);
    setMother(data?.setMother);
    // setEnterBirthDate(data?.birthDate);
    setPlaceOfBirth(data?.placeOfBirth);
  }, [data]);


  const saveData = () => {
    const newPerson = {
      id: data.id,
      firstName: nume,
      lastName: prenume,
      address: adresa,
      mobilePhone: telefon,
      email: email,
      sex: sex,
      fatherName: father,
      motherName: mother,
      birthDate: enterBirthDate,
      placeOfBirth: placeOfBirth,
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
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Nume</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    onChange={(event) => setNume(event.target.value)} value={nume} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Telefon</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    onChange={(event) => setTelefon(event.target.value)} value={telefon} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                  <InputGroup.Text id="inputGroup-sizing-sm">Data nasterii</InputGroup.Text>
                  <DatePicker
                    selected={enterBirthDate}
                    onChange={(date) => setEnterBirthDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Sexul</InputGroup.Text>
                  <RadioGroup style={{ display: 'flex', flexDirection: 'row', paddingLeft: 14 }} name="use-radio-group" defaultValue="first">
                    <FormControlLabel value="true" label="Masculin" control={<Radio />} />
                    <FormControlLabel value="false" label="Feminin" control={<Radio />} />
                  </RadioGroup>
                </InputGroup>


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

                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Adresa</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
              </Col>
              <Col>
                <form>
                  <FileUploader
                    onFileSelectSuccess={(file) => setSelectedFile(file)}
                    // onFileSelectError={({ error }) => alert(error)}
                  />
                  {/* <button onClick={submitForm}>Submit</button> */}
                </form>

                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Prenume</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    value={prenume}
                    onChange={(event) => setPrenume(event.target.value)} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Adresa</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    value={adresa}
                    onChange={(event) => setAdresa(event.target.value)} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Locul nasterii</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    value={placeOfBirth}
                    onChange={(event) => setPlaceOfBirth(event.target.value)} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Tata</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    value={father}
                    onChange={(event) => setFather(event.target.value)} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Mama</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    value={mother}
                    onChange={(event) => setMother(event.target.value)} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">email</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    onChange={(event) => setEmail(event.target.value)} value={email} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">email</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
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