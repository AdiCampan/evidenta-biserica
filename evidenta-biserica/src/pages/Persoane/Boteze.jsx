import { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useGetMembersQuery } from '../../services/members';
import { filterByText, formatDate, searchField, filterByAgeGreater, filterByAgeSmaller, filterByDate, calculateAge } from '../../utils';
import './Boteze.scss';


function Boteze() {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const navigate = useNavigate();

  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [ageFilterGreater, setAgeFilterGreater] = useState('');
  const [ageFilterSmaller, setAgeFilterSmaller] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [telefonFilter, setTelefonFilter] = useState('');
  const [listByDateBaptized, setListByDateBaptized] = useState([]);
  const [baptisms, setBaptisms] = useState ([]);


  function filterMembers(members) {
    let filteredMembers = members;

    filteredMembers = filterByText(filteredMembers, 'firstName', firstNameFilter);
    filteredMembers = filterByText(filteredMembers, 'lastName', lastNameFilter);
    filteredMembers = filterByText(filteredMembers, 'address', addressFilter);
    filteredMembers = filterByText(filteredMembers, 'mobilePhone', telefonFilter);
    filteredMembers = filterByAgeGreater(filteredMembers, 'birthDate', ageFilterGreater);
    filteredMembers = filterByAgeSmaller(filteredMembers, 'birthDate', ageFilterSmaller);
    filteredMembers = filteredMembers.filter(member => member.baptiseDate);
    filteredMembers = filteredMembers.filter(member => member.baptisePlace === "EBEN EZER");

    const listBaptist = filteredMembers.reduce((boteze, item) => {
      if (!boteze.find(botez => botez.baptiseDate === item.baptiseDate)) {
        boteze.push(item);
      }
      return boteze;
    }, []);
   
    return listBaptist;
  }

  const goToPerson = (id) => {
    navigate(`/persoane/${id}`);
  };

  const listBaptized = (dataBotez) => {
     
    let listaBotezati = persoane.filter(data => data.baptiseDate === dataBotez)

    setListByDateBaptized(listaBotezati)
     }
   
  

  return (
    <>
      <div className='pagina-boteze'>
        <div className='boteze'>
          <h3 className='title'>BOTEZE în EBEN EZER</h3>
          <Table striped bordered hover size="sm" >
            <thead>
              <tr>
                <th>#</th>
                <th>Data Botezului</th>
                <th>Slujitori Botez</th>
              </tr>
            </thead>
            <tbody>
              {persoane ? filterMembers(persoane).map((p, index) => (
                <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => listBaptized(p.baptiseDate)}>
                  <td>{index + 1}</td>
                  <td>{formatDate(p.baptiseDate)}</td>
                  <td>{p.baptisePlace}</td>
                </tr>
              )) : null}
            </tbody>
          </Table>
        </div>
        <div className='botezati'>
          <h2 className='title'>BOTEZATI</h2>
          <Table striped bordered hover size="sm" >
            <thead>
              <tr>
                <th>#</th>
                <th>Nume</th>
                <th>Prenume</th>
                <th>D. Nasterii</th>
                <th>Varsta</th>
                <th>Sex</th>
                <th>Detalii</th>
              </tr>
            </thead>
            <tbody>
              {listByDateBaptized ? listByDateBaptized.map((p, index) => (
                <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => goToPerson(p.id)}>
                  <td>{index + 1}</td>
                  <td>{p.firstName}</td>
                  <td>{p.lastName}</td>
                  <td>{formatDate(p.birthDate)}</td>
                  <td>{calculateAge(p.birthDate)}</td>
                  <td>{p.sex ? 'M' : 'F'}</td>
                  <td>{p.details}</td>
                </tr>

              )) : null}

            </tbody>

          </Table>

        </div>
      </div>
    </>
  )
}

export default Boteze