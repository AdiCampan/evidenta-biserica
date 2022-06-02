import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useGetMembersQuery } from '../../services/members';

import Persoane from '../Persoane';

function Rapoarte() {

  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        // activeKey={activeTab}
        // onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="persoane" title="Persoane">
          {}
        </Tab>
        <Tab eventKey="contributii" title="Contributii">
          {}
        </Tab>
        <Tab eventKey="boteze" title="Boteze">
          {}
        </Tab>
        <Tab eventKey="observatii" title="Observatii">
          {}
        </Tab>
      </Tabs>
    </div>
  )
}

export default Rapoarte;