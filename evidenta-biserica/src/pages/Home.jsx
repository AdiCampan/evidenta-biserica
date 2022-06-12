import React from 'react';
import './Home.css';
import img from '../assets/images/Logo.png'

const Home = () => {
    return (
        <div className='home_page'>
            <div className='secretariat_text'>SECRETARIAT</div>
            <div className='biserica_text'>BISERICA EBEN-EZER CASTELLON</div> 
            {/* <img className='logo-eben-ezer' src={img}></img> */}
        </div>
        
    );
}

export default Home;
