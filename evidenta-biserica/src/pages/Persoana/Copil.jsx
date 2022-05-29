import { useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useGetMembersQuery, useModifyMemberMutation } from '../../services/members';
import { IoCloseSharp } from 'react-icons/io5';
import { Button } from 'react-bootstrap';


function Copil({ childUpdated, removeChild }) {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [copil, setCopil] = useState('');
  
  const onCopilChange = (person) => {
    if (person.length > 0) {
      setCopil(person[0].id);
      childUpdated(person[0].id);
    } else {
      setCopil('');
    }
  }

  return (
    <div>
      <InputGroup size="sm">
        <Typeahead
          id="copil"
          onChange={onCopilChange}
          labelKey={option => `${option.firstName} ${option.lastName}`}
          options={persoane || []}
          placeholder="Alege o persoana..."
          selected={persoane?.filter(person => person.id === copil) || []}
        />
        <Button onClick={removeChild}><IoCloseSharp /></Button>
      </InputGroup>
    </div>
  )
}

export default Copil;
