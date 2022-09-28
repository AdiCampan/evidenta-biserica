import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Card, FormControl } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form'
import AddTransferModal from './AddTransferModal';
import { calculateAge, formatDate, searchField } from '../../utils';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useGetTransfersQuery, useDelTransferMutation } from '../../services/transfers';



const Transferuri = () => {

  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { data: transfers, isLoading: trasnfersLoading } = useGetTransfersQuery();
  const [delTransfer] = useDelTransferMutation()
  const [transferTo, setTransferTo] = useState(false)
  const [transferFrom, setTransferFrom] = useState(false)

  const intrati = ['baptise', 'transferFrom'];

  function filterTransfers(transfer) {
    let filteredTransfers = transfer;

    // first name
    filteredTransfers = filteredTransfers.filter(filteredTransfers => {
      if (firstNameFilter === '') {
        return true;
      } else if (searchField(filteredTransfers.owner.firstName, firstNameFilter)) {
        return true;
      }
      return false;
    });

    // transfer from and transfer to
    if (transferFrom != transferTo) {
      if (transferFrom) {
        filteredTransfers =filteredTransfers.filter(t => t.type === "transferFrom")
      }
      else {
        filteredTransfers =filteredTransfers.filter(t => t.type === "transferTo")
      }
    }


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
              <td>
                <div>
                  <Form.Check
                    inline
                    label="in"
                    name="destinatie"
                    type='checkbox'
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.checked)}
                  />
                  <Form.Check
                    inline
                    label="din"
                    name="destinatie"
                    type='checkbox'
                    value={transferFrom}
                    onChange={(e) => setTransferFrom(e.target.checked)}
                  />
                </div>
              </td>
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