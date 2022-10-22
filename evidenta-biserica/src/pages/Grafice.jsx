import './Grafice.scss';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useGetMembersQuery } from '../services/members';
import { useState } from 'react';
import { calculateAge, formatDate } from '../utils'


function Grafice() {

  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [nrMembrii, setNrMembrii] = useState([]);

  const date = new Date().toDateString();
  const totalMembrii = persoane?.filter(p => p.memberDate).length;

  const nrBarbati = persoane?.filter(p => p.sex == true && (calculateAge(p.birthDate) >= 18)).length;
  const nrFemei = persoane?.filter(p => p.sex == false && p.memberDate && (calculateAge(p.birthDate) >= 18)).length;
  const nrCopii = persoane?.filter(p => (calculateAge(p.birthDate)) < 18).length;

  const getMemberHistoryYears = () => {
    const currentYear = new Date().getFullYear();
    const years = getYearsFromInterval(currentYear - 10, currentYear);
    return years;
  }

  const getYearsFromInterval = (from, to) => {
    const listOfYears = [];
    for (let year = from; year <= to; year++) {
      listOfYears.push(year);
    }
    return listOfYears;
  }

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
      <div className='container-principal'>
        <div className='chart'>
          <Pie data={{
            labels: ['Barbati', 'Femei'],
            datasets: [
              {
                data: [nrBarbati, nrFemei],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 99, 132, 0.7)',
                ]
              }
            ]
          }}
            // width={300}
            // height={300}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className='chart'>
          <div className='total-text'><p>Total Membrii la {formatDate(date)}: </p>{" "}<p style={{ fontWeight : 'bolder', marginLeft: '5px'}}>{totalMembrii}</p></div>
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
                },
                // {
                //   id: 2,
                //   label: 'Nr.de copii',
                //   data: getMemberHistory(),
                //   backgroundColor: [
                //     'rgba(54, 162, 235, 1.9)',
                //   ]
                // }
              ],
            }}
          />
        </div>
        <div className='chart'>
          <Bar
            data={{
              labels: [''],
              datasets: [
                {
                  label: 'Barbati',
                  data: [nrBarbati],
                  backgroundColor: 'rgba(255, 99, 132, 0.7)',
                },
                {
                  label: 'Femei',
                  data: [nrFemei],
                  backgroundColor: 'rgba(53, 162, 235, 0.7)',
                },
              ],
            }}
          />
        </div>
        <div className='chart'>
          <p>RAPORT PE VÂRSTĂ</p>
        </div>
        <div className='chart'>
          <p>RAPORT COPII</p>
        </div>
        <div className='chart'></div>
      </div>
    </>
  )
}
export default Grafice;