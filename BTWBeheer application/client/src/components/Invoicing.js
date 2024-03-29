import React, { useEffect, useState, useRef } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import fetchCompanyData from '../api/getCompany';
import fetchInvoicesData from '../api/getInvoices';
import fetchRelationsData from '../api/getRelations';
import fetchProductsDataByInvoice from '../api/getProductsByInvoice'

import { EditDeleteDownload } from './buttons';

import { parseDateToString } from '../helpers/dateParser'; 

import FullNavbar from './FullNavbar';

import { Alert, Button, Container, Row, Col } from 'react-bootstrap';

const columns = [
    { field: 'id', headerName: 'ID', sortable: false, },
    { field: 'creation_date_object', headerName: 'Date', width: 140, type: 'date', valueGetter: (params) => { return new Date(params.value); },},
    { field: 'due_date_object', headerName: 'Due date', width: 140, type: 'date', valueGetter: (params) => { return new Date(params.value); },},
    { field: 'relation_name', headerName: 'Relation', width: 180, },
    { field: 'invoice_description', headerName: 'Description', width: 320, },
    // Buttons
    { field: 'Buttons', headerName: '', sortable: false, disableColumnMenu: true, renderCell: EditDeleteDownload, width: 280, },
];

const Invoicing = () => {
    const [company, setCompany] = useState(null);
    const [invoices, setInvoices] = useState(null);
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
      // Fetch invoices data when dataLoaded is true
      if (dataLoaded) {
        fetchInvoicesData(data => {
            if (!data) {
                setInvoices(null); // Set an empty array if there are no invoices
            } else {
                // Your existing code to modify and set the data

                // Modify the data here...
                const modifiedData = data.map(async item => {
                    const products = await fetchProductsDataByInvoice(item.invoice_id);
                    return {
                        id: item.invoice_id,
                        invoice_reference_no: item.invoice_id.replace(/-/g, '').slice(0,8),
                        relation_name: relations.find(relation => relation.relation_id === item.relation_id).relation_name,
                        creation_date_string: parseDateToString(item.creation_date),
                        due_date_string: parseDateToString(item.due_date),            
                        creation_date_object: item.creation_date,
                        due_date_object: item.due_date,
                        company: company,
                        relation: relations.find(relation => relation.relation_id === item.relation_id),
                        type: 'invoice',
                        products: products || [],
                        ...item,
                    };
                });
        
                // Set the modified data in the state
                Promise.all(modifiedData).then(modifiedInvoices => {
                    setInvoices(modifiedInvoices);
                });
            }
        });
      }
    }, [dataLoaded]);

    console.log(invoices)

    return (
        <div>
            <FullNavbar company={company}/>

            <Container>
                <Row className="align-items-center">
                    <Col>
                        <h1>Invoices</h1>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="success" href='CreateInvoice' target='_self'>+ Invoice</Button>
                    </Col>
                </Row>
            </Container>

            < br/>

            {/*Invoices table*/}
            {invoices == null ? 
                <Alert variant="info">
                    <Alert.Heading>Hey, it seems you have not yet made an invoice.</Alert.Heading>
                    <p>
                        To create your first invoice, please click on the plus icon in the top right corner!
                    </p>
                </Alert>
            : 
                <div>
                    <DataGrid
                        style={{  background: '#888', color: '#000000DE', borderRadius: '7px', border: 'none', }}
                        sx={{
                            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                            outline: 'transparent',
                            },
                            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]: {
                            outline: 'none',
                            },
                        }}
                        rows={invoices}
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
 
export default Invoicing;