import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Transferuri from './Transferuri';
import Boteze from './Boteze';
import Persoane from './Persoane';
import Membrii from './Membrii';
import Speciale from './Speciale';
import Familii from './Familii';


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
      <Tab eventKey="boteze" title="Botezuri">
        {<Boteze />}
      </Tab>
      <Tab eventKey="observatii" title="Cazuri Speciale">
        {<Speciale />}
      </Tab>
      <Tab eventKey="transferuri" title="Transferuri">
        {<Transferuri />}
      </Tab>
      <Tab eventKey="familii" title="Familii">
        {<Familii />}
      </Tab>
    </Tabs>
  )
}

export default PersonsPage;
