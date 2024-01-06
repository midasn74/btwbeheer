import React, { useEffect, useState } from 'react';

import fetchCompanyData from '../api/getCompany';
import fetchQuotationsData from '../api/getQuotations';
import fetchInvoicesData from '../api/getInvoices';

import FullNavbar from './FullNavbar';
 
const Dashboard = () => {
    const [company, setCompany] = useState(null);
    const [quotations, setQuotations] = useState(null);
    const [invoices, setInvoices] = useState(null);

    // TODO!
    // TODO!
    
    const marginThisWeek = 243.58;
    const marginThisMonth = 678.63;
    const marginThisYear = 12445.91;

    useEffect(() => {
        fetchCompanyData(setCompany);
        fetchQuotationsData(setQuotations);
        fetchInvoicesData(setInvoices);
      }, []);

    console.log(company)
    console.log(quotations)

    // for every element in company make a div

    return (
    <div>
        <FullNavbar company={company}/>
        <br />

        <h1>{company?.company_name}</h1>
        <br />

        {/*TODO*/}
        <div style={{ display: "flex" }}>
            <div style={{ borderRadius: '7px', border: '3px solid #fff', padding: "25px", margin: "10px" }}>
            <h2>Revenue</h2>
                <div><p style={{ display: "inline" }}><b>This week: </b></p><p style={{ display: "inline", color: marginThisWeek > 0 ? "lightGreen" : "red" }}>€{marginThisWeek.toFixed(2)}</p></div>
                <div><p style={{ display: "inline" }}><b>This month: </b></p><p style={{ display: "inline", color: marginThisMonth > 0 ? "lightGreen" : "red" }}>€{marginThisMonth.toFixed(2)}</p></div>
                <div><p style={{ display: "inline" }}><b>This year: </b></p><p style={{ display: "inline", color: marginThisYear > 0 ? "lightGreen" : "red" }}>€{marginThisYear.toFixed(2)}</p></div>
            </div>

            <div style={{ borderRadius: '7px', border: '3px solid #fff', padding: "25px", margin: "10px" }}>
            <h2>Quotes created</h2>
                <div><p style={{ display: "inline" }}><b>This week: </b></p><p style={{ display: "inline" }}>{quotations == null ? 0 : quotations?.length}</p></div>
                <div><p style={{ display: "inline" }}><b>This month: </b></p><p style={{ display: "inline" }}>{quotations == null ? 0 : quotations?.length}</p></div>
                <div><p style={{ display: "inline" }}><b>This year: </b></p><p style={{ display: "inline" }}>{quotations == null ? 0 : quotations?.length}</p></div>
            </div>

            <div style={{ borderRadius: '7px', border: '3px solid #fff', padding: "25px", margin: "10px" }}>
            <h2>invoices created</h2>
                <div><p style={{ display: "inline" }}><b>This week: </b></p><p style={{ display: "inline" }}>{invoices == null ? 0 : invoices?.length}</p></div>
                <div><p style={{ display: "inline" }}><b>This month: </b></p><p style={{ display: "inline" }}>{invoices == null ? 0 : invoices?.length}</p></div>
                <div><p style={{ display: "inline" }}><b>This year: </b></p><p style={{ display: "inline" }}>{invoices == null ? 0 : invoices?.length}</p></div>
            </div>
        </div>
    </div>
    );
  };
 
export default Dashboard;