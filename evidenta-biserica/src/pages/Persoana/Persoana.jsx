
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useRef, useEffect } from 'react';
import { useGetMemberQuery, useModifyMemberMutation } from '../../services/members';
import { Card, FormControl } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import DatePicker from 'react-datepicker';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import "./Persoana.css";
import General from './General';
import Biserica from './Biserica';
import Familie from './Familie';


function Persoana() {

  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useGetMemberQuery(id);
  const [modifyMember, result] = useModifyMemberMutation();
  const [activeTab, setActiveTab] = useState('general');
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const saveData = () => {
    if (currentData.firstName != "" && currentData.lastName != "") {
      modifyMember(currentData);
    }
    else {
      alert("Nu stergeti numele sau prenumele !")
    };
  };

  const dataUpdated = (updatedData) => {
    setCurrentData(prevState => ({
      ...prevState,
      ...updatedData,
    }));
  };

  return (
    <Card>
      <Tabs
        id="controlled-tab-example"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="general" title="General">
          {data && <General data={data} dataUpdated={dataUpdated} />}
        </Tab>
        <Tab eventKey="familie" title="Familie">
          {data && <Familie data={data} dataUpdated={dataUpdated} />}
        </Tab>
        <Tab eventKey="biserica" title="Biserica">
          {data && <Biserica data={data} dataUpdated={dataUpdated} />}
        </Tab>
      </Tabs>
      <Card>
        <Card.Body>
          <Form>
            <Button variant="primary" type="button" onClick={saveData}>
              Salveaza
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Card>
  )
}

export default Persoana