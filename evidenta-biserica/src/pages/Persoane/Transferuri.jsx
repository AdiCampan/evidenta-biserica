import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, Card, FormControl } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { useGetMembersQuery } from '../../services/members';
import AddTransfer from './AddTransfer';
import { formatDate } from '../../utils';

const AGE_FILTER_LABEL = {
  '1': '>=',
  '2': '<=',
  '3': '=',
  '4': '< >'
}

function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const Transferuri = () => {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();


  const [ageFilterType, setAgeFilterType] = useState('1');
  const [ageFilter, setAgeFilter] = useState('');
  const [ageFilterBetween, setAgeFilterBetween] = useState('');
  const [transfers, setTransfers] = useState([]);


  const addTransfer = transfer => {
    const transfersActualizados = [transfer, ...transfers];
    setTransfers(transfersActualizados)
  }

  return (
    <>
      <Col>
        <InputGroup size="sm" className="mb-3">
          <AddTransfer onAddTransfer={addTransfer} />
        </InputGroup>
      </Col>
      <Card>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nume si Prenume</th>
              <th>Transferat in :</th>
              <th>Data transferului</th>
              <th>Act de transfer</th>
              <th>Detalii</th>
              <th>Varsta</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((p, index) => (
              <tr >
                <td>{index + 1}</td>
                <td>{p.person.firstName} {p.person.lastName}</td>
                <td>{p.bisericaTransfer}</td>
                <td>{formatDate(p.dataTransfer)}</td>
                <td>{p.actTransfer}</td>
                <td>{p.detalii}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  )
}

export default Transferuri;