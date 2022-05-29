import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useGetMemberQuery } from '../../services/members';

import Persoane from '../Persoane';

function Rapoarte() {

  const { data, error, isLoading, isFetching } = useGetMemberQuery();

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
        <Tab eventKey="familie" title="Familie">
          {}
        </Tab>
        <Tab eventKey="biserica" title="Biserica">
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