
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { useGetMemberQuery, useModifyMemberMutation, useAddRelationMutation } from '../../services/members';
import { Card } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./Persoana.css";
import General from './General';
import Biserica from './Biserica';
import Familie from './Familie';
import Observatii from './Observatii';
import DownloadLink from "react-download-link";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";




function Persoana() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useGetMemberQuery(id);
  const [modifyMember, result] = useModifyMemberMutation();
  const [addRelation] = useAddRelationMutation();
  const [activeTab, setActiveTab] = useState('general');
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);


  useEffect(() => {
    if (result.isSuccess) {
      navigate("/persoane");
    }
  }, [result]);

  const saveData = () => {
    if (currentData.firstName != "" && currentData.lastName != "") {
      modifyMember(currentData);
    }
    else {
      alert("Nu stergeti numele sau prenumele !")
    };
      // addRelation({
      //   owner: currentData.id,
      //   person: currentData.partner,
      //   type: currentData.sex ? 'wife' : 'husband',
      // });
  };

  const dataUpdated = (updatedData) => {
    setCurrentData(prevState => {
     
      return {
        // ...prevState,
        id,
        ...updatedData,
      }
    });
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
        <Tab eventKey="observatii" title="Observatii">
          {data && <Observatii data={data} dataUpdated={dataUpdated} />}
        </Tab>
      </Tabs>
      <Card>
        <Card.Body>
          <Form>
            <Button variant="primary" type="button" onClick={saveData} disabled={result.isLoading}    >
              Salveaza
            </Button>
            
            <DownloadLink
              label="Descarca link Persoana"
              filename={`/persoane/${id}`}
              exportFile={() => `/persoane/${id}`}
            />
            <Link to={`/persoane/${id}`} target="_blank" download>Download</Link>
            {/* <a href="https://google.com" download>Download link</a> */}
          </Form>
        </Card.Body>
      </Card>
    </Card>
  )
}

export default Persoana