import React, { useEffect, useState } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import fetchCompanyData from '../api/getCompany';
import fetchQuotationsData from '../api/getQuotations';
import fetchRelationsData from '../api/getRelations';

import { deleteButton, editButton } from './buttons';

import { parseDateToString } from '../helpers/dateParser'; 

import FullNavbar from './FullNavbar';

import { Alert, Button, Container, Row, Col } from 'react-bootstrap';

const columns = [
    { field: 'id', headerName: 'ID', sortable: false, },
    { field: 'creation_date_object', headerName: 'Date', width: 140, type: 'date', valueGetter: (params) => { return new Date(params.value); },},
    { field: 'valid_until_object', headerName: 'Valid until', width: 140, type: 'date', valueGetter: (params) => { return new Date(params.value); },},
    { field: 'relation_name', headerName: 'Relation', width: 180, },
    { field: 'quotation_description', headerName: 'Description', width: 320, },
    // Edit button
    { field: 'edit', headerName: '', sortable: false, disableColumnMenu: true, renderCell: editButton },
    // Delete button
    { field: 'delete', headerName: '', sortable: false, disableColumnMenu: true, renderCell: deleteButton },
];

const Qouting = () => {
    const [company, setCompany] = useState(null);
    const [quotations, setQuotations] = useState(null);
    const [relations, setRelations] = useState(null);
    
    useEffect(() => {
      fetchCompanyData(setCompany);
      fetchRelationsData(setRelations);
      fetchQuotationsData(data => {
        // Ensure that relations data is available
        if (!data || !relations) return;

        // Modify the data here by renaming 'quotation_id' to 'id'
        const modifiedData = data.map(item => ({
            id: item.quotation.id,
            relation_name: relations.find(relation => relation.relation_id === item.relation_id).relation_name,
            creation_date_string: parseDateToString(item.creation_date),
            valid_until_string: parseDateToString(item.valid_until),            
            creation_date_object: item.creation_date,
            due_date_object: item.due_date,
            type: 'quotation',
            ...item
        }));

        // Set the modified data in the state
        setQuotations(modifiedData);
      });
    }, [relations]);

    return (
        <div>
            <FullNavbar company={company}/>

            {/*Make a quotation creator*/}
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <h1>Quotations</h1>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="success">+ Quotation</Button>
                    </Col>
                </Row>
            </Container>

            < br/>

            {/*Quotations table*/}
            {quotations == null ? 
                <Alert variant="info">
                    <Alert.Heading>Hey, it seems you have not yet made an quotation.</Alert.Heading>
                    <p>
                        To create your first quotation, please click on the plus icon in the top right corner!
                    </p>
                </Alert>
            : 
                <div style={{  background: '#bbb', borderRadius: '7px', border: '3px solid #fff' }}>
                    <DataGrid
                        sx={{
                            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                            outline: 'transparent',
                            },
                            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]: {
                            outline: 'none',
                            },
                        }}
                        rows={quotations}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                            columns: {
                                columnVisibilityModel: { id: false, },
                            },  
                        }}
                        disableRowSelectionOnClick
                    />
                </div>
            }
        </div>
    );
  };
 
export default Qouting;