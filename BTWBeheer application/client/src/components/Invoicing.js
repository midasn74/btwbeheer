import React, { useEffect, useState } from 'react';

import fetchCompanyData from '../api/getCompany';
import fetchInvoicesData from '../api/getInvoices';

import FullNavbar from './FullNavbar';

import { Alert, Table, Button, Container, Row, Col } from 'react-bootstrap';
 
const Dashboard = () => {
    const [company, setCompany] = useState(null); 
    const [invoices, setInvoices] = useState(null); 

    useEffect(() => {
        fetchCompanyData(setCompany);
        fetchInvoicesData(setInvoices);
    }, []);

    return (
    <div>
        <FullNavbar company={company}/>

        {/*Make a invoice creator*/}
        <Container>
            <Row className="align-items-center">
                <Col>
                    <h1>Invoices</h1>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="success">+ Invoice</Button>
                </Col>
            </Row>
        </Container>

        {/*Make a invoice searching module*/}

        {/*Invoices table*/}
        {invoices == null ? 
            <Alert variant="info">
                <Alert.Heading>Hey, it seems you have not yet made an invoice.</Alert.Heading>
                <p>
                    To create your first invoice, please click on the plus icon in the top right corner!
                </p>
            </Alert>
        : 
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Relation</th>
                        <th>Description</th>
                        <th>Due date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        }
    </div>
    );
  };
 
export default Dashboard;