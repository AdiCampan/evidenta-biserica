import { useState } from 'react';
import './Home.css';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useGetMembersQuery } from '../services/members';
import { calculateAge, formatDate } from '../utils'
import { Button } from 'react-bootstrap';


const getYearsFromInterval = (from, to) => {
  const listOfYears = [];
  for (let year = from; year <= to; year++) {
    listOfYears.push(year);
  }
  return listOfYears;
}

const getMemberHistoryYears = () => {
  const currentYear = new Date().getFullYear();
  const years = getYearsFromInterval(currentYear - 10, currentYear);
  return years;
}


const Home = () => {
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();

  const [nrMembrii, setNrMembrii] = useState([]);

  const date = new Date().toDateString();
  const totalMembrii = persoane?.filter(p => p.memberDate).length;

  const nrBarbati = persoane?.filter(p => p.sex == true && (calculateAge(p.birthDate) >= 18)).length;
  const nrFemei = persoane?.filter(p => p.sex == false && p.memberDate && (calculateAge(p.birthDate) >= 18)).length;
  const nrCopii = persoane?.filter(p => (calculateAge(p.birthDate)) < 18).length;

  const getMemberHistory = () => {
    const membersByYears = [];
    const years = getMemberHistoryYears();
    for (let i = 0; i < years.length; i++) {
      const personsByYear = persoane?.filter(p => {
        if (new Date(p.memberDate).getFullYear() <= years[i]) {
          // if (p.leaveDate &&  new Date(p.leaveDate).getFullYear() > years[i]) {
          // 	return true;
          // } else if (!p.leaveDate) {
          return true;
          // }
        }
        return false;
      }).length;
      membersByYears.push(personsByYear);
    }
    return membersByYears;
  }

  return (
    <>
      <div className='home_page'>
        <div className='secretariat_text'>SECRETARIAT</div>
        <div className='biserica_text'>BISERICA EBEN-EZER CASTELLON</div>
      </div>
      <div className='charts'>
      <div className='info-bar'>
          <h3>Biserica Eben-Ezer Castellon</h3>
          <p>
            Adresa: Pg Ind Acceso Sur, Calle Francia Nave 3C, 12006 Castellón de la Plana
          </p><br/>
          <p>Tel./Fax: 964 37 24 00</p><br/>
          <Button variant="primary" >
            Cere Fișa membru
          </Button>
          <p>biserica_ebenezer@yahoo.es</p>
        </div>
        <div className='chart-container'>
          <Pie data={{
            labels: ['Barbați', 'Femei', 'Copii'],
            datasets: [
              {
                data: [nrBarbati, nrFemei, nrCopii],
                backgroundColor: [
                  'rgba(50, 162, 235, 0.7)',
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(145, 63, 184, 0.7)',
                ]
              }
            ]
          }}
            width={150}
            height={150}
            options={{ maintainAspectRatio: true }}
          />
        </div>
        <div className='chart-conatiner'>
        <div className='total-text'><h5>Total Membrii la {formatDate(date)}:</h5> <h3>{totalMembrii}</h3></div>
          <Line
            datasetIdKey='id345'
            data={{
              labels: getMemberHistoryYears(),
              datasets: [
                {
                  id: 1,
                  label: 'Nr.de membri',
                  data: getMemberHistory(),
                  backgroundColor: [
                    'rgba(54, 162, 235, 1.9)',
                  ]
                }
              ],
            }}
          />
          
        </div>
        
        {/* <div className='bar-chart'>
					<Bar
						data={{
							labels: [''],
							datasets: [
								{
									label: 'Barbati',
									data: [nrBarbati],
									backgroundColor:'rgba(53, 162, 235, 0.5)' ,
								},
								{
									label: 'Femei',
									data: [nrFemei],
									backgroundColor: 'rgba(255, 99, 132, 0.9)',
								},
								{
									label: 'Copii',
									data: [nrCopii],
									backgroundColor: 'rgba(145, 63, 184, 0.5)',
								}
							],
						}}
					/>
				</div> */}
      </div>
      <footer className='footer'>copyright © Media EBEN-EZER 2022 </footer>

    </>
  );
}

export default Home;
