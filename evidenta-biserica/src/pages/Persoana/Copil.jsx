import { useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useGetMembersQuery, useModifyMemberMutation } from '../../services/members';
import { IoCloseSharp } from 'react-icons/io5';
import { Button } from 'react-bootstrap';
import { calculateAge } from '../../utils';


function Copil({ childUpdated, removeChild, selected }) {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [copil, setCopil] = useState(selected);
  const [dataNasterii, setDataNasterii] = useState('');
  const [varsta, setVarsta] = useState('');
  const [sex, setSex] = useState('');

  useEffect(() => {
    if (isLoading === false) {
      setDataNasterii(persoane?.find(persoana => persoana.id === selected)?.birthDate.split('T')[0]);
      setVarsta(calculateAge(persoane?.find(persoana => persoana.id === selected)?.birthDate));
      setSex((persoane?.find(persoana => persoana.id === selected)?.sex ? 'M' : 'F'));
    }
  }, [persoane]);

  const onCopilChange = (person) => {
    if (person.length > 0) {
      setCopil(person[0].id);
      childUpdated(person[0].id);
      if (person[0].birthDate) {
        setDataNasterii(person[0].birthDate.split('T')[0]);

        // calcul varsta
        const dataNasteriiUnix = Math.floor(new Date(person[0].birthDate).getTime() / 1000);
        const dataCurentaUnix = Math.floor(new Date().getTime() / 1000);
        setVarsta(Math.floor((dataCurentaUnix - dataNasteriiUnix) / 3600 / 24 / 365));
        
      }
      setSex(person[0].sex ? 'M' : 'F');
    } else {
      setCopil('');
    }
  }

  return (
    <tr>
      <td>
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
      </td>
      <td>{dataNasterii}</td>
      <td>{varsta}</td>
      <td>{sex}</td>
    </tr>
  )
}

export default Copil;
