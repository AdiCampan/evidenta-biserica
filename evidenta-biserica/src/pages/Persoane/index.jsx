import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Transferuri from './Transferuri';
import Botezati from './Botezati';
import Persoane from './Persoane';
import Membrii from './Membrii';
import Speciale from './Speciale';

const PersonsPage = () => {
  return (

    <Tabs
      id="controlled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="persoane" title="Persoane">
        {<Persoane />}
      </Tab>
      <Tab eventKey="membrii" title="Membrii">
        {<Membrii />}
      </Tab>
      <Tab eventKey="botezati" title="Botezati">
        {<Botezati />}
      </Tab>
      <Tab eventKey="observatii" title="Cazuri Speciale">
        {<Speciale />}
      </Tab>
      <Tab eventKey="transferuri" title="Transferuri">
        {<Transferuri />}
      </Tab>
    </Tabs>
  )
}

export default PersonsPage;
