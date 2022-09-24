import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Card, FormControl } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { useGetMembersQuery } from '../../services/members';
import AddTransferModal from './AddTransferModal';
import { calculateAge, formatDate } from '../../utils';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useGetTransfersQuery, useDelTransferMutation } from '../../services/transfers';


const Transferuri = () => {
  
  // const [transfers, setTransfers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { data: transfers, isLoading: trasnfersLoading } = useGetTransfersQuery();
  const [delTransfer] = useDelTransferMutation()

  const addTransfer = transfer => {
    const transfersActualizados = [transfer, ...transfers];
    setTransfers(transfersActualizados)
  }

  const intrati = ['baptise', 'transferFrom'];

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
            {transfers && transfers.map((transfer, index) => (
              <tr style={{ backgroundColor: intrati.includes(transfer.type) ? '#00c90057' : '#ff000021' }}>
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
        <AddTransferModal onAddTransfer={addTransfer} show={showModal} onClose={() => setShowModal(false)} />
      </Card>
    </>
  )
}

export default Transferuri;