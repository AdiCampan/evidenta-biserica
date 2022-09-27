import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Card, FormControl } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { useGetMembersQuery } from '../../services/members';
import AddTransferModal from './AddTransferModal';
import { calculateAge, formatDate, searchField} from '../../utils';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useGetTransfersQuery, useDelTransferMutation } from '../../services/transfers';



const Transferuri = () => {

  const [firstNameFilter, setFirstNameFilter] = useState('');

  // const [transfers, setTransfers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { data: transfers, isLoading: trasnfersLoading } = useGetTransfersQuery();
  const [delTransfer] = useDelTransferMutation()

  const intrati = ['baptise', 'transferFrom'];

  const firstNameTransfered = transfers?.map((transfer) => transfer.owner);


  // function filterTransfers(transfer)  {
  //  if (firstNameFilter === " "){
  //    return true;
  //  }else if (transfer[0].owner.firstName === firstNameFilter){
  //   return true;
  //  }
  //  return false;
  // };
  function filterTransfers(transfer) {
    
    let filteredTransfers = transfer;

    filteredTransfers = filteredTransfers.filter(filteredTransfers => {
      if (firstNameFilter === '') {
        return true;
      } else if (searchField(filteredTransfers.owner.firstName, firstNameFilter)) {
        return true;
      }
      return false;
    });
    return filteredTransfers;
  }




  return (
    <>
      <Col>
        <InputGroup size="sm" className="mb-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Adauga transfer
          </Button>
        </InputGroup>
      </Col>
      <Card>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nume si Prenume</th>
              <th>Transferat</th>
              <th>Data transferului</th>
              <th>Act de transfer</th>
              <th>Detalii</th>
              <th>Varsta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  className='search-input'
                  placeholder='Filtreaza'
                  type="text"
                  value={firstNameFilter}
                  onChange={(e) => setFirstNameFilter(e.target.value)}
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {transfers && filterTransfers(transfers).map((transfer, index) => (
              <tr key={transfer.id} style={{ backgroundColor: intrati.includes(transfer.type) ? '#00c90057' : '#ff000021' }}>
                <td>{index + 1}</td>
                <td>{transfer.owner.firstName} {transfer.owner.lastName}</td>
                <td>{intrati.includes(transfer.type) ? 'din' : 'in'} {transfer.churchTransfer}</td>
                <td>{formatDate(transfer.date)}</td>
                <td>{transfer.docNumber}</td>
                <td style={{ wordBreak: 'break-all', maxWidth: '200px' }}>{transfer.details}</td>
                <td>{calculateAge(transfer.owner.birthDate)}</td>
                <td>
                  <FaTrash
                    style={{ cursor: 'pointer' }}
                    onClick={() => delTransfer(transfer.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddTransferModal show={showModal} onClose={() => setShowModal(false)} />
      </Card>
    </>
  )
}

export default Transferuri;