import { useState } from 'react';
import './Home.css';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useGetMembersQuery } from '../services/members';
import { calculateAge } from '../utils'


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

	const nrBarbati = persoane?.filter(p => p.sex == true  && (calculateAge(p.birthDate)<=18)).length;
	const nrFemei = persoane?.filter(p => p.sex == false && (calculateAge(p.birthDate)<=18)).length;
	const nrCopii = persoane?.filter(p => (calculateAge(p.birthDate)) > 18 ).length;

	const getMemberHistory = () => {
		const membersByYears = [];
		const years = getMemberHistoryYears();
		for(let i = 0; i < years.length; i++) {
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
				<div className='pie-chart'>
					<Pie data={{
						labels: ['Barbati', 'Femei'],
						datasets: [
							{
								data: [nrBarbati, nrFemei],
								backgroundColor: [
									'rgba(54, 162, 235, 0.5)',
									'rgba(255, 99, 132, 0.5)',
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
							labels: getMemberHistoryYears(),
							datasets: [
								{
									id: 1,
									label: 'Membrii',
									data: getMemberHistory(),
									backgroundColor: [
										'rgba(54, 162, 235, 1.9)',
									]
								}
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
									data: [nrBarbati],
									backgroundColor: 'rgba(255, 99, 132, 0.9)',
								},
								{
									label: 'Femei',
									data: [nrFemei],
									backgroundColor: 'rgba(53, 162, 235, 0.5)',
								},
								{
									label: 'Copii',
									data: [nrCopii],
									backgroundColor: 'rgba(145, 63, 184, 0.5)',
								}
							],
						}}
					/>
				</div>
			</div>
			{/* <img className='logo-eben-ezer' src={img}></img> */}

		</>
	);
}

export default Home;
