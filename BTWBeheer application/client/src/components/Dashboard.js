import React, { useEffect, useState } from 'react';

import fetchCompanyData from '../api/getCompany';
import fetchQuotationsData from '../api/getQuotations';
import fetchInvoicesData from '../api/getInvoices';

import FullNavbar from './FullNavbar';

function calculateVatDeclarationDates(interval) {
    // Current date
    const currentDate = new Date();

    // Initialize variables for next and previous dates
    let nextVatDeclarationDate, previousVatDeclarationDate;

    switch (interval) {
        case "weekly":
            // Calculate next Monday
            nextVatDeclarationDate = new Date(currentDate);
            nextVatDeclarationDate.setDate(currentDate.getDate() + (1 + 7 - currentDate.getDay()) % 7);
            
            // Calculate previous Monday
            previousVatDeclarationDate = new Date(currentDate);
            previousVatDeclarationDate.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7);
            break;
        case "monthly":
            // Calculate next month
            nextVatDeclarationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
            
            // Calculate previous month
            previousVatDeclarationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            break;
        case "quarterly":
            // Calculate next quarter
            nextVatDeclarationDate = new Date(currentDate.getFullYear(), Math.floor((currentDate.getMonth() + 2) / 3) * 3 + 3, 1);
            
            // Calculate previous quarter
            previousVatDeclarationDate = new Date(currentDate.getFullYear(), Math.floor((currentDate.getMonth() + 2) / 3) * 3, 1);
            break;
        case "yearly":
            // Calculate next year
            nextVatDeclarationDate = new Date(currentDate.getFullYear() + 1, 0, 1);
            
            // Calculate previous year
            previousVatDeclarationDate = new Date(currentDate.getFullYear() - 1, 0, 1);
            break;
        default:
            // Handle the case where the interval is not recognized
            throw new Error("Invalid vat_declaration_interval");
    }

    return { nextVatDeclarationDate, previousVatDeclarationDate };
}

const Dashboard = () => {
    const [company, setCompany] = useState(null);
    const [quotations, setQuotations] = useState(null);
    const [invoices, setInvoices] = useState(null);

    useEffect(() => {
        fetchCompanyData(setCompany);
        fetchQuotationsData(setQuotations);
        fetchInvoicesData(setInvoices);
      }, []);

    let invoicesThisWeekCount = 0;
    let invoicesThisMonthCount = 0;
    let invoicesThisYearCount = 0;

    if (invoices != null ){
        if (invoices.length > 0){
            invoices.forEach((invoice) => {
                const inputDate = new Date(invoice.creation_date);

                // Get today's date
                const today = new Date();

                // Check if the year, month, and week are the same
                invoicesThisYearCount += (inputDate.getFullYear() === today.getFullYear()) ? 1 : 0;
                invoicesThisMonthCount += (inputDate.getMonth() === today.getMonth()) ? 1 : 0;
                invoicesThisWeekCount += (inputDate.getDate() - inputDate.getDay() === today.getDate() - today.getDay()) ? 1 : 0;
            })
        }
    }

    let quotesThisWeekCount = 0;
    let quotesThisMonthCount = 0;
    let quotesThisYearCount = 0;

    if (quotations != null ){
        if (quotations.length > 0){
            quotations.forEach((quote) => {
                const inputDate = new Date(quote.creation_date);

                // Get today's date
                const today = new Date();

                // Check if the year, month, and week are the same
                quotesThisYearCount += (inputDate.getFullYear() === today.getFullYear()) ? 1 : 0;
                quotesThisMonthCount += (inputDate.getMonth() === today.getMonth()) ? 1 : 0;
                quotesThisWeekCount += (inputDate.getDate() - inputDate.getDay() === today.getDate() - today.getDay()) ? 1 : 0;
            })
        }
    }

    let nextVatDeclarationDate, previousVatDeclarationDate;
    let daysUntilNextDeclaration, daysSincePreviousDeclaration;

    if (company != null) {
        ({ nextVatDeclarationDate, previousVatDeclarationDate } = calculateVatDeclarationDates(company.vat_declaration_interval));

        daysUntilNextDeclaration = nextVatDeclarationDate != null ? Math.ceil((nextVatDeclarationDate - new Date()) / (1000 * 60 * 60 * 24)) : null;
        daysSincePreviousDeclaration = previousVatDeclarationDate != null ? Math.ceil((new Date() - previousVatDeclarationDate) / (1000 * 60 * 60 * 24)) : null;
    }

    return (
    <div>
        <FullNavbar company={company}/>
        <br />

        <h1>{company?.company_name}</h1>
        <br />

        <hr/>

        <div>
            <p><b>Next Vat Declaration Date:</b> {nextVatDeclarationDate != null ? nextVatDeclarationDate.toDateString() : "-"}</p>
            <p style={{ color: "lightGreen"}}>
                {daysUntilNextDeclaration !== null ? `${daysUntilNextDeclaration} days until the next declaration` : "-"}
            </p>

            <p><b>Previous Vat Declaration Date:</b> {previousVatDeclarationDate != null ? previousVatDeclarationDate.toDateString() : "-"}</p>
            <p style={{ color: "#f77" }}>
                {daysSincePreviousDeclaration !== null ? `${daysSincePreviousDeclaration} days since the last declaration` : "-"}
            </p>
        </div>

        <hr/>

        <div style={{ display: "flex" }}>
            <div style={{ borderRadius: '7px', border: '3px solid #fff', padding: "25px", margin: "10px" }}>
            <h2>invoices created</h2>
                <div><p style={{ display: "inline" }}><b>This week: </b></p><p style={{ display: "inline" }}>{invoices == null ? 0 : invoicesThisWeekCount}</p></div>
                <div><p style={{ display: "inline" }}><b>This month: </b></p><p style={{ display: "inline" }}>{invoices == null ? 0 : invoicesThisMonthCount}</p></div>
                <div><p style={{ display: "inline" }}><b>This year: </b></p><p style={{ display: "inline" }}>{invoices == null ? 0 : invoicesThisYearCount}</p></div>
            </div>
            <div style={{ borderRadius: '7px', border: '3px solid #fff', padding: "25px", margin: "10px" }}>
            <h2>Quotes created</h2>
                <div><p style={{ display: "inline" }}><b>This week: </b></p><p style={{ display: "inline" }}>{quotations == null ? 0 : quotesThisWeekCount}</p></div>
                <div><p style={{ display: "inline" }}><b>This month: </b></p><p style={{ display: "inline" }}>{quotations == null ? 0 : quotesThisMonthCount}</p></div>
                <div><p style={{ display: "inline" }}><b>This year: </b></p><p style={{ display: "inline" }}>{quotations == null ? 0 : quotesThisYearCount}</p></div>
            </div>
        </div>

        <hr/>
    </div>
    );
  };
 
export default Dashboard;