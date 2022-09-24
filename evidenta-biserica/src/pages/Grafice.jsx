import React from 'react'
import './Grafice.scss';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useGetMembersQuery } from '../services/members';


function Grafice() {

  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();

  const nrBarbati = persoane?.filter(p => p.sex == true).length;
  const nrFemei = persoane?.filter(p => p.sex == false).length;

 
  return (
    <>
      <div className='charts'>
        <div className='pie-chart'>
          <Pie data={{
            labels: ['Barbati', 'Femei'],
            datasets: [
              {
                data: [nrBarbati, nrFemei],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                ]
              }
            ]
          }}
            width={300}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className='line-chart'>
          <Line
            datasetIdKey='id345'
            data={{
              labels: ['Jun', 'Jul', 'Aug'],
              datasets: [
                {
                  id: 1,
                  label: '',
                  data: [5, 6, 7],
                },
                {
                  id: 2,
                  label: '',
                  data: [3, 2, 1],
                },
              ],

            }}

          />
        </div>
        <div className='bar-chart'>
            <Bar
            data={{
              labels: [''],
              datasets: [
                {
                  label: 'Barbati',
                  data:[nrBarbati],
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'Femei',
                  data: [nrFemei],
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
              ],
            }}
            />
        </div>
      </div>
    </>
  )
}
export default Grafice;