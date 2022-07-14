
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import AddPerson from './AddPerson';
import { useNavigate } from 'react-router-dom';
import { useGetMembersQuery, useAddMemberMutation, useDelMemberMutation } from '../../services/members';
import Confirmation from '../../Confirmation';
import {
  calculateAge, formatDate, searchField, filterByText, filterByAgeSmaller,
  filterByAge, filterByAgeGreater, filterByDate, filterBySex
} from '../../utils';

import './Persoane.scss';

const AGE_FILTER_LABEL = {
  '1': '>=',
  '2': '<=',
  '3': '=',
  '4': '< >'
}

function Persoane() {
  const navClass = (isActive) => {
    return isActive ? "active" : "";
  }
  const navigate = useNavigate();

  const [idToDelete, setIdToDelete] = useState(null);
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('')
  const [ageFilterBetween, setAgeFilterBetween] = useState('')
  const [addressFilter, setAddressFilter] = useState('');
  const [telefonFilter, setTelefonFilter] = useState('');
  const [sexFilter, setSexFilter] = useState('');
  const [ageFilterType, setAgeFilterType] = useState('1');
  const [memberSorting, setMemberSorting] = useState({
    field: null,
    direction: null
  });
  const [baptisedOnly, setBaptisedOnly] = useState(false);
  const [notBabtisedOnly, setNotBaptisedOnly] = useState(false);
  const [blessedOnly, setBlessedOnly] = useState(false);
  const [notBlessedOnly, setNotBlessedOnly] = useState(false);
  let { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [deleteMember] = useDelMemberMutation();

  function filterMembers(members) {
    let filteredMembers = members;

    filteredMembers = filterByText(filteredMembers, 'firstName', firstNameFilter);
    filteredMembers = filterByText(filteredMembers, 'lastName', lastNameFilter);
    filteredMembers = filterByText(filteredMembers, 'address', addressFilter);
    filteredMembers = filterByText(filteredMembers, 'mobilePhone', telefonFilter);
    if (ageFilterType === '1' || ageFilterType === '4') { // >=
      filteredMembers = filterByAgeGreater(filteredMembers, 'birthDate', ageFilter);
    }
    if (ageFilterType === '2') { // <=
      filteredMembers = filterByAgeSmaller(filteredMembers, 'birthDate', ageFilter);
    }
    if (ageFilterType === '3') { // ==
      filteredMembers = filterByAge(filteredMembers, 'birthDate', ageFilter);
    }
    if (ageFilterType === '4') {
      filteredMembers = filterByAgeSmaller(filteredMembers, 'birthDate', ageFilterBetween);
    }
    filteredMembers = filterBySex(filteredMembers, sexFilter);

    if (baptisedOnly !== notBabtisedOnly) {
      if (baptisedOnly) {
        filteredMembers = filteredMembers.filter(member => member.baptiseDate);
      }
      if (notBabtisedOnly) {
        filteredMembers = filteredMembers.filter(member => !member.baptiseDate);
      }
    }

    if (blessedOnly !== notBlessedOnly) {
      if (blessedOnly) {
        filteredMembers = filteredMembers.filter(member => member.blessingDate);
      }
      if (notBlessedOnly) {
        filteredMembers = filteredMembers.filter(member => !member.blessingDate);
      }
    }
    return filteredMembers;
  }

  function deletePerson(id) {
    deleteMember(id);

    setIdToDelete(null);
  };

  const showDeleteModal = (personId, ev) => {
    setIdToDelete(personId);
    ev.stopPropagation();
  }

  const goToPerson = (id) => {
    navigate(`/persoane/${id}`);
  };

  const filterBaptize = (members) => {
    let filteredMembers = members;
    filteredMembers = filterByDate(filteredMembers, 'baptiseDate');
    return filteredMembers;
  };

  const sortList = (a, b) => {
    if (!memberSorting.field) {
      return 1;
    }
    // ascendent
    if (memberSorting.direction === 'asc') {
      if (a[memberSorting.field]?.toLowerCase() > b[memberSorting.field]?.toLowerCase()) {
        return 1;
      }
      return -1;
      // descendent
    } else {
      if (a[memberSorting.field]?.toLowerCase() < b[memberSorting.field]?.toLowerCase()) {
        return 1;
      }
      return -1;
    }
  };

  const sorting = (field) => {
    let newDirection = 'asc';

    // 1. nu e setat deloc, deci trebuie pus ascendent
    if (memberSorting.direction === null) {
      newDirection = 'asc';
      // 2. e setat ascendent, deci trebuie pus descendent
    } else if (memberSorting.direction === 'asc') {
      newDirection = 'desc';
      // 3 e setat descendent, deci trebuie pus ascendent
    } else {
      newDirection = 'asc';
    }

    setMemberSorting({
      field: field,
      direction: newDirection,
    });
  }

  return (
    <div className="page-persons">
      <div className="lista_persoane">
        <div className='barra-buttons'>
          <AddPerson />
        </div>
        <div>
          <Form.Check
            inline
            label="Botezati"
            name="group1"
            type="checkbox"
            value={baptisedOnly}
            onChange={(e) => setBaptisedOnly(e.target.checked)}
          />
          <Form.Check
            inline
            label="Nebotezati"
            name="group1"
            type="checkbox"
            value={notBabtisedOnly}
            onChange={(e) => setNotBaptisedOnly(e.target.checked)}
          />
        </div>
        <div>
          <Form.Check
            inline
            label="Dusi la Binecuvantare"
            name="group1"
            type='checkbox'
            value={blessedOnly}
            onChange= {(e) => setBlessedOnly(e.target.checked)}
          />
          <Form.Check
            inline
            label="Nu dusi la Binecuvantare"
            name="group1"
            type='checkbox'
            value={notBlessedOnly}
            onChange= {(e) => setNotBlessedOnly(e.target.checked)}
          />
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => sorting('firstName')} style={{ cursor: 'pointer' }}>Nume</th>
              <th onClick={() => sorting('lastName')} style={{ cursor: 'pointer' }}>Prenume</th>
              <th onClick={() => sorting('address')} style={{ cursor: 'pointer' }}>Adresa</th>
              <th>Telefon</th>
              <th onClick={() => sorting('age')} style={{ cursor: 'pointer' }}>Varsta</th>
              <th>Data nasterii</th>
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
                <input
                  className='search-input'
                  type="text"
                  value={addressFilter}
                  onChange={(e) => setAddressFilter(e.target.value)}
                />
              </td>
              <td>
                <input
                  className='search-phone'
                  type='text'
                  value={telefonFilter}
                  onChange={(e) => setTelefonFilter(e.target.value)}
                />
              </td>
              <td>
                <div>
                  {[DropdownButton].map((DropdownType, idx) => (
                    <DropdownType
                      as={ButtonGroup}
                      key={idx}
                      id={`dropdown-button-drop-${idx}`}
                      size="sm"
                      variant="secondary"
                      title={AGE_FILTER_LABEL[ageFilterType]}
                      onSelect={(key) => setAgeFilterType(key)}
                    >
                      <Dropdown.Item eventKey="1">Peste sau egal cu...</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Sub sau egal cu...</Dropdown.Item>
                      <Dropdown.Item eventKey="3">Doar Cu varsta...</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="4">Intre varstele...</Dropdown.Item>
                    </DropdownType>
                  ))}
                </div>
                <input
                  className="age-input"
                  type="number"
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                />
                {ageFilterType == '4' && (<input
                  className="age-input"
                  type="number"
                  value={ageFilterBetween}
                  onChange={(e) => setAgeFilterBetween(e.target.value)}
                />)}
              </td>
              <td></td>
              <td className='sex-filter'>
                <RadioGroup
                  style={{ display: 'flex', flexDirection: 'row', paddingLeft: 14 }}
                  name="use-radio-group"
                  value={sexFilter}
                  onChange={(e) => { setSexFilter(e.target.value) }}
                >
                  <FormControlLabel value="M" label="M" control={<Radio />} />
                  <FormControlLabel value="F" label="F" control={<Radio />} />
                  <FormControlLabel value="" label="M+F" control={<Radio />} />
                </RadioGroup>
              </td>
              <td></td>
            </tr>
            {persoane ? filterMembers(persoane).sort(sortList).map((p, index) => (
              <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => goToPerson(p.id)}>
                <td>{index + 1}</td>
                <td>{p['firstName']}</td>
                <td>{p.lastName}</td>
                <td>{p.address}</td>
                <td>{p.mobilePhone}</td>
                <td>{calculateAge(p.birthDate)}</td>
                <td>{formatDate(p.birthDate)}</td>
                <td>{p.sex ? 'M' : 'F'}</td>
                <td>
                  <Button variant="primary" onClick={(event) => showDeleteModal(p.id, event)}>Sterge</Button>
                </td>
              </tr>

            )) : null}

          </tbody>

        </Table>

      </div>
      <Confirmation
        showModal={idToDelete != null}
        id={idToDelete}
        confirmModal={(id) => deletePerson(id)}
        message="Esti sigur ca vrei sa stergi persoana din baza de date ?"
        hideModal={() => setIdToDelete(null)}
      />
    </div>
  );
};

export default Persoane;