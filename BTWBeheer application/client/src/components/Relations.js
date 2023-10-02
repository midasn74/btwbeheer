import React, { useEffect, useState } from 'react';

import fetchCompanyData from '../api/getCompany';
import fetchRelationsData from '../api/getRelations';

import FullNavbar from './FullNavbar';

import { Alert, Table, Button, Container, Row, Col } from 'react-bootstrap';
 
const Dashboard = () => {
    const [company, setCompany] = useState(null); 
    const [relations, setRelations] = useState(null); 

    useEffect(() => {
        fetchCompanyData(setCompany);
        fetchRelationsData(setRelations);
    }, []);

    return (
        <div>
            <FullNavbar company={company}/>

            {/*Make a relation creator*/}
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <h1>Relations</h1>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="success">+ Relation</Button>
                    </Col>
                </Row>
            </Container>

            {/*Make a relation searching module*/}

            {/*Relations table*/}
            {relations == null ? 
                <Alert variant="info">
                    <Alert.Heading>Hey, it seems you have not yet made a relation.</Alert.Heading>
                    <p>
                        To create your first relation, please click on the plus icon in the top right corner!
                    </p>
                </Alert>
            : 
                <Table striped hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Contact person</th>
                            <th>Phone number</th>
                            <th>E-mail</th>
                            <th>Address</th>
                            <th>Postal code</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>KVK number</th>
                            <th>VAT number</th>
                            <th>IBAN number</th>
                            <th>Salutation</th>
                        </tr>
                    </thead>
                    <tbody>
                            {relations.map(relation => (  
                                <tr>
                                    <td>{relation.relation_id}</td>  
                                    <td>{relation.relation_name}</td>  
                                    <td>{relation.relation_contact}</td>  
                                    <td>{relation.relation_email}</td>  
                                    <td>{relation.relation_phone}</td>  
                                    <td>{relation.relation_address}</td>  
                                    <td>{relation.relation_postal_code}</td>  
                                    <td>{relation.relation_city}</td>  
                                    <td>{relation.relation_country}</td>  
                                    <td>{relation.relation_kvk_number}</td>  
                                    <td>{relation.relation_vat_number}</td>  
                                    <td>{relation.relation_iban}</td>  
                                    <td>{relation.relation_salutation}</td>  
                                </tr>
                            ))}  
                    </tbody>
                </Table>
            }
        </div>
    );
};
 
export default Dashboard;