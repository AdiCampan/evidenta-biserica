import { useState } from 'react';
import { useGetMembersQuery } from '../../services/members';
import { useNavigate } from 'react-router-dom';
import { filterByText, formatDate, searchField, filterByAgeGreater, filterByAgeSmaller, filterByDate, calculateAge } from '../../utils';
import Table from 'react-bootstrap/Table';
import './Familii.scss';


const Familii = () => {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const navigate = useNavigate();

  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [ageFilterGreater, setAgeFilterGreater] = useState('');
  const [ageFilterSmaller, setAgeFilterSmaller] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [telefonFilter, setTelefonFilter] = useState('');
  const [childrens, setChildrens] = useState([]);

  function filterMembers(members) {
    let filteredMembers = members;

    filteredMembers = filterByText(filteredMembers, 'firstName', firstNameFilter);
    filteredMembers = filterByText(filteredMembers, 'lastName', lastNameFilter);
    filteredMembers = filterByText(filteredMembers, 'address', addressFilter);
    filteredMembers = filterByText(filteredMembers, 'mobilePhone', telefonFilter);
    filteredMembers = filterByAgeGreater(filteredMembers, 'birthDate', ageFilterGreater);
    filteredMembers = filterByAgeSmaller(filteredMembers, 'birthDate', ageFilterSmaller);
    filteredMembers = filteredMembers.filter(member => member.relations.find(relation => relation.type === 'wife'))
    return filteredMembers;
  }


  const listChildrens = (childrens) => {
   const childrensFiltered = childrens.filter(relation => relation.type === "child").map(relation => relation?.person);
   
      
      setChildrens(childrensFiltered);
      console.log(childrensFiltered);
  }

  return (

    <div className='pagina-familii'>
      <div className='familii'>Familii
        <Table striped bordered hover size="sm" >
          <thead>
            <tr>
              <th>#</th>
              <th>Familia</th>
              <th>Data serv. Civil</th>
              <th>Data serv. Relig.</th>
              <th>Biserica Serv. Relig.</th>
              <th>Nume anterior soție</th>
              <th>Varsta soț</th>
              <th>Varsta soție</th>
            </tr>
          </thead>
          <tbody>
            {persoane ? filterMembers(persoane).map((p, index) => (
              <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => listChildrens(p.relations)}>
                <td>{index + 1}</td>
                <td>{p.firstName} {p.lastName} și {p.relations.find(relation => relation.type === "wife")?.person.lastName}</td>
                <td>{formatDate(p.relations.find(relation => relation.type === "wife")?.civilWeddingDate)}</td>
                <td>{formatDate(p.relations.find(relation => relation.type === "wife")?.religiousWeddingDate)}</td>
                <td>{p.relations.find(relation => relation.type === "wife")?.weddingChurch}</td>
                <td>{p.relations.find(relation => relation.type === "wife")?.person.maidenName}</td>
                <td>{calculateAge(p.birthDate)}</td>
                <td>{calculateAge((p.relations.find(relation => relation.type === "wife")?.person.birthDate))}</td>
              </tr>
            )) : null}
          </tbody>
        </Table>
      </div>
      <div className='copii'>Copii
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
            {childrens ? childrens.map((p, index) => (
              <tr key={p.id} >
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

  )
}

export default Familii;