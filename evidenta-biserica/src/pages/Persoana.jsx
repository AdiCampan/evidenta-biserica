
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';
import { useGetMemberQuery, useModifyMemberMutation } from '../services/members';
import { Card } from 'react-bootstrap';


function Persoana() {

  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useGetMemberQuery(id);
  const [modifyMember, result] = useModifyMemberMutation();

  console.log(data);

  const [nume, setNume] = useState(data?.firstName);
  const [prenume, setPrenume] = useState(data?.lastName);
  const [adresa, setAdresa] = useState(data?.address);
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState(data?.email);
  const [sex, setSex] = useState(data?.telefon);

  useEffect(() => {
    setNume(data?.firstName);
    setPrenume(data?.lastName);
    setAdresa(data?.address);
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
    };
    if (nume != "" && prenume != "") {
      modifyMember(newPerson);

    }
    else {
      alert("Nu stergeti numele sau prenumele !")
    };
    console.log(newPerson);
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
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Adresa</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Prenume</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                    value={prenume}
                    onChange={(event) => setPrenume(event.target.value)} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">email</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">email</InputGroup.Text>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
              </Col>
            </Row>
          </Container>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email" placeholder="Enter email" value={email}
              onChange={(event) => setEmail(event.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nume</Form.Label>
            <Form.Control
              type="text" placeholder="Nume" value={nume}
              onChange={(event) => setNume(event.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prenume</Form.Label>
            <Form.Control
              type="text" placeholder="Prenume" value={prenume}
              onChange={(event) => setPrenume(event.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adresa</Form.Label>
            <Form.Control
              type="text" placeholder="Adresa" value={adresa}
              onChange={(event) => setAdresa(event.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefon</Form.Label>
            <Form.Control type="text" placeholder="Telefon" value={telefon}
              onChange={(event) => setTelefon(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sex</Form.Label>
            <Form.Control type="text" placeholder="Sex" value={data?.sex} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={saveData}>
            Salveaza
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Persoana