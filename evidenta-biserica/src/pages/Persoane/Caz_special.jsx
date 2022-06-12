
import { useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useGetMembersQuery, useModifyMemberMutation } from '../../services/members';
import { IoCloseSharp } from 'react-icons/io5';
import { Button } from 'react-bootstrap';
import {
  calculateAge, formatDate, searchField, filterByText, filterByAgeSmaller,
  filterByAge, filterByAgeGreater, filterByDate, filterBySex
} from '../../utils';


const Caz_special = ({ caseUpdated, removeCase }) => {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();

  const [caz, setCaz] = useState('');
  const [openCase, setOpencase] = useState('');
  const [details, setDetails] = useState('');
  const [dataNasterii, setDataNasterii] = useState('');



  const onCazChange = (person) => {
    if (person.length > 0) {
      setCaz(person[0].id);
      caseUpdated(person[0].id);
      if (person[0].birthDate) {
        setDataNasterii(person[0].birthDate.split('T')[0]);
      }
    } else {
      setCaz('');
    }
  }

  return (
    <tr>
      <td>
        <InputGroup size="sm">
          <Typeahead
            id="caz"
            onChange={onCazChange}
            labelKey={option => `${option.firstName} ${option.lastName}`}
            options={persoane || []}
            placeholder="Alege o persoana..."
            selected={persoane?.filter(person => person.id === caz) || []}
          />
          <Button onClick={removeCase}><IoCloseSharp /></Button>
        </InputGroup>
      </td>
      <td>{calculateAge(dataNasterii)}</td>
      <td>{openCase}</td>
      <td>{details}</td>
    </tr>
  )
}

export default Caz_special;