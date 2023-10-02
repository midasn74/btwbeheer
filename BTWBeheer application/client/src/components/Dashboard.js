import React, { useEffect, useState } from 'react';

import fetchCompanyData from '../api/getCompany';

import FullNavbar from './FullNavbar';
 
const Dashboard = () => {
    const [company, setCompany] = useState(null); // Initialize company state

    useEffect(() => {
        fetchCompanyData(setCompany);
    }, []);
  
    return (
    <div>
        <FullNavbar company={company}/>
    </div>
    );
  };
 
export default Dashboard;