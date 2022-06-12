import { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useGetMembersQuery } from '../../services/members';
import { filterByText, formatDate, searchField, filterByAgeGreater, filterByAgeSmaller, filterByDate, calculateAge } from '../../utils';
import './Botezati.scss';


function Boteze() {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const navigate = useNavigate();

  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [ageFilterGreater, setAgeFilterGreater] = useState('');
  const [ageFilterSmaller, setAgeFilterSmaller] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [telefonFilter, setTelefonFilter] = useState('');


  function filterMembers(members) {
    let filteredMembers = members;

    filteredMembers = filterByText(filteredMembers, 'firstName', firstNameFilter);
    filteredMembers = filterByText(filteredMembers, 'lastName', lastNameFilter);
    filteredMembers = filterByText(filteredMembers, 'address', addressFilter);
    filteredMembers = filterByText(filteredMembers, 'mobilePhone', telefonFilter);
    filteredMembers = filterByAgeGreater(filteredMembers, 'birthDate', ageFilterGreater);
    filteredMembers = filterByAgeSmaller(filteredMembers, 'birthDate', ageFilterSmaller);

    return filteredMembers;
  }

  const goToPerson = (id) => {
    navigate(`/persoane/${id}`);
  };

  return (
    <div className='page-boteze'>Botezati
      <RadioGroup
        style={{ display: 'flex', flexDirection: 'row', paddingLeft: 14 }}
        name="use-radio-group"
      // value={}
      // onChange={(e) => { console.log('valoare', e); setSex(e.target.value) }}
      >
        <FormControlLabel value="B" label="Botezati" control={<Radio />} />
        <FormControlLabel value="F" label="Nebotezati" control={<Radio />} />
      </RadioGroup>
      <RadioGroup
        style={{ display: 'flex', flexDirection: 'row', paddingLeft: 14 }}
        name="use-radio-group"
      // value={}
      // onChange={(e) => { console.log('valoare', e); setSex(e.target.value) }}
      >
        <FormControlLabel value="B" label="" control={<Radio />} />
        <FormControlLabel value="F" label="Nebotezati" control={<Radio />} />
      </RadioGroup>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nume</th>
            <th>Prenume</th>
            <th>Data Botezului</th>
            <th>Locul Botezului</th>
            <th>Varsta</th>
            <th>Slujitori Botez</th>
            <th>Sex</th>
            <th>Actiuni</th>
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
              <input
                className='search-input'
                type="text"
                value={lastNameFilter}
                onChange={(e) => setLastNameFilter(e.target.value)}
              />
            </td>
            <td>
            </td>
            <td>
            </td>
            <td>
              <input
                className="age-input"
                placeholder='>0'
                type="text"
                value={ageFilterGreater}
                onChange={(e) => setAgeFilterGreater(e.target.value)}
              />
              <input
                className="age-input"
                placeholder='<99'
                type="text"
                value={ageFilterSmaller}
                onChange={(e) => setAgeFilterSmaller(e.target.value)}
              />
            </td>
            <td></td>
            <td>
            </td>
            <td></td>
          </tr>
          {persoane ? filterMembers(persoane).map((p, index) => (
            <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => goToPerson(p.id)}>
              <td>{index + 1}</td>
              <td>{p['firstName']}</td>
              <td>{p.lastName}</td>
              <td>{formatDate(p.baptiseDate)}</td>
              <td>{p.baptisePlace}</td>
              <td>{calculateAge(p.birthDate)}</td>
              <td>{formatDate(p.birthDate)}</td>
              <td>{p.sex ? 'M' : 'F'}</td>
              {/* {console.log(p.sex)} */}
              <td>
                <Button variant="primary" onClick={(event) => showDeleteModal(p.id, event)}>Sterge</Button>
              </td>
            </tr>

          )) : null}

        </tbody>

      </Table>
    </div>
  )
}

export default Boteze