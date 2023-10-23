import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import fetchCompanyData from '../api/getCompany';
import fetchRelationsData from '../api/getRelations';

import FullNavbar from './FullNavbar';

import { Alert, Button, Container, Row, Col } from 'react-bootstrap';

const columns = [
    { field: 'id', headerName: 'ID', sortable: false, width: 40, disableColumnMenu: true },
    { field: 'relation_name', headerName: 'Name', width: 180, },
    { field: 'relation_contact', headerName: 'Contact person', width: 180, },
    { field: 'relation_phone', headerName: 'Phone number', width: 140, },
    { field: 'relation_email', headerName: 'E-mail', width: 180, },
    { field: 'relation_address', headerName: 'Address', width: 180, },
    { field: 'relation_postal_code', headerName: 'Postal code', width: 120, },
    { field: 'relation_city', headerName: 'City', width: 120, },
    { field: 'relation_country', headerName: 'Country', width: 120, },
    { field: 'relation_kvk_number', headerName: 'KVK number', width: 120, },
    { field: 'relation_vat_number', headerName: 'VAT number', width: 120, },
    { field: 'relation_iban', headerName: 'IBAN', width: 190, },
    { field: 'relation_salutation', headerName: 'Salutation', width: 100, }
];

const Dashboard = () => {
    const [company, setCompany] = useState(null); 
    const [relations, setRelations] = useState(null); 

    useEffect(() => {
        fetchCompanyData(setCompany);
        fetchRelationsData(data => {
            // Modify the data here by renaming 'relation_id' to 'id'
            const modifiedData = data.map(item => ({
                id: item.relation_id,
                ...item
            }));
      
            // Set the modified data in the state
            setRelations(modifiedData);
        });
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

            <br />

            {/*Relations table*/}
            {relations == null ? 
                <Alert variant="info">
                    <Alert.Heading>Hey, it seems you have not yet made a relation.</Alert.Heading>
                    <p>
                        To create your first relation, please click on the plus icon in the top right corner!
                    </p>
                </Alert>
            : 
                <div style={{  background: '#bbb', borderRadius: '7px', border: '3px solid #fff' }}>
                    <DataGrid
                        rows={relations}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                    />
                </div>
            }
        </div>
    );
};

export default Dashboard;