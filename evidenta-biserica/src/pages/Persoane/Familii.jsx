import { useState } from 'react';
import { useGetMembersQuery } from '../../services/members';
import {  formatDate, calculateAge } from '../../utils';
import Table from 'react-bootstrap/Table';
import './Familii.scss';

const Familii = () => {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [childrens, setChildrens] = useState([]);

  function filterMembers(members) {
    let filteredMembers = members;
    filteredMembers = filteredMembers.filter(member => member.relations.find(relation => relation.type === 'wife'));
    filteredMembers = filteredMembers.filter(person => person.sex === true);
    return filteredMembers;
  }

  const listChildrens = (childrens) => {
    const childrensFiltered = childrens.filter(relation => relation.type === "child").map(relation => relation?.person);
    setChildrens(childrensFiltered);
    console.log(childrensFiltered);
  }

  const filterWife = (relation) => relation.type === "wife";

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
                <td>{p.firstName} {p.lastName} și {p.relations.find(filterWife)?.person.lastName}</td>
                <td>{formatDate(p.relations.find(filterWife)?.civilWeddingDate)}</td>
                <td>{formatDate(p.relations.find(filterWife)?.religiousWeddingDate)}</td>
                <td>{p.relations.find(filterWife)?.weddingChurch}</td>
                <td>{p.relations.find(filterWife)?.person.maidenName}</td>
                <td>{calculateAge(p.birthDate)}</td>
                <td>{calculateAge((p.relations.find(filterWife)?.person.birthDate))}</td>
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