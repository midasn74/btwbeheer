import React, { useEffect, useState, useRef } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import fetchCompanyData from '../api/getCompany';
import fetchQuotationsData from '../api/getQuotations';
import fetchRelationsData from '../api/getRelations';
import fetchProductsDataByQuotation from '../api/getProductsByQuotation'

import { EditDeleteDownload } from './buttons';

import { parseDateToString } from '../helpers/dateParser'; 

import FullNavbar from './FullNavbar';

import { Alert, Button, Container, Row, Col } from 'react-bootstrap';

const columns = [
    { field: 'id', headerName: 'ID', sortable: false, },
    { field: 'creation_date_object', headerName: 'Date', width: 140, type: 'date', valueGetter: (params) => { return new Date(params.value); },},
    { field: 'valid_until_object', headerName: 'Valid until', width: 140, type: 'date', valueGetter: (params) => { return new Date(params.value); },},
    { field: 'relation_name', headerName: 'Relation', width: 180, },
    { field: 'quotation_description', headerName: 'Description', width: 320, },
    // Buttons
    { field: 'Buttons', headerName: '', sortable: false, disableColumnMenu: true, renderCell: EditDeleteDownload, width: 280, },
];

const Quoting = () => {
    const [company, setCompany] = useState(null);
    const [quotations, setQuotations] = useState(null);
    const [relations, setRelations] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
  
    const initialCompany = useRef(company);
    const initialRelations = useRef(relations);
  
    useEffect(() => {
      // Fetch company and relations data
      fetchCompanyData(setCompany);
      fetchRelationsData(setRelations);
    }, []);
  
    useEffect(() => {
      // Check if both company and relations data have been loaded
      if (company !== null && relations !== null) {
        initialCompany.current = company;
        initialRelations.current = relations;
        setDataLoaded(true);
      }
    }, [company, relations]);
  
    useEffect(() => {
      // Fetch quotations data when dataLoaded is true
      if (dataLoaded) {
        fetchQuotationsData(data => {
            if (!data) {
                setQuotations(null); // Set an empty array if there are no quotations
            } else {
                // Your existing code to modify and set the data

                // Modify the data here...
                const modifiedData = data.map(async item => {
                    const products = await fetchProductsDataByQuotation(item.quotation_id);
                    return {
                        id: item.quotation_id,
                        quotation_reference_no: item.quotation_id.replace(/-/g, '').slice(0,8),
                        relation_name: relations.find(relation => relation.relation_id === item.relation_id).relation_name,
                        creation_date_string: parseDateToString(item.creation_date),
                        valid_until_string: parseDateToString(item.valid_until),            
                        creation_date_object: item.creation_date,
                        valid_until_object: item.valid_until,
                        company: company,
                        relation: relations.find(relation => relation.relation_id === item.relation_id),
                        type: 'quotation',
                        products: products || [],
                        ...item,
                    };
                });
        
                // Set the modified data in the state
                Promise.all(modifiedData).then(modifiedQuotations => {
                    setQuotations(modifiedQuotations);
                });
            }
        });
      }
    }, [dataLoaded]);

    console.log(quotations)

    return (
        <div>
            <FullNavbar company={company}/>

            <Container>
                <Row className="align-items-center">
                    <Col>
                        <h1>Quotations</h1>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="success" href='CreateQuotation' target='_self'>+ Quotation</Button>
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
 
export default Quoting;