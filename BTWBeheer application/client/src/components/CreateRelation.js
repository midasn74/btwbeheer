import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Card, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { getCompanyId, getJWT } from '../utils/auth';

const InfoHover = ({ message }) => (
    <OverlayTrigger placement="top" overlay={<Tooltip>{message}</Tooltip>}>
        <svg style={{ margin: '0px 0px 0px 5px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
    </OverlayTrigger>
);

const RequiredAsterisks = (
    <element class="text-danger">*</element>
)

const CreateRelation = () => {
  const [formData, setFormData] = useState({
    company_id: getCompanyId(),
    relation_name: '',
    relation_contact: '',
    relation_email: '',
	relation_phone: '',
	relation_address: '',
	relation_postal_code: '',
	relation_city: '',
	relation_country: '',
	relation_kvk_number: '',
	relation_vat_number: '',
	relation_iban: '',
	relation_salutation: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    document.querySelector('#main-form-submit-button').disabled = true;

    console.log('Relation creation form submitted:', formData);

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/relations/`, formData, {
            headers: {
                'Authorization': getJWT()
            }
        })
        
        if (response.status !== 200) {
            throw new Error('Relation creation failed');
        } else {
            console.log('Relation creation successful:', response.data);
        }

        // Reload the opener window
        if (window.opener && !window.opener.closed) {
            window.opener.location.reload();
        }

        // Go back to the relations page
        window.open('Relations', '_self');
    
    } catch (error) {
        console.error('Register failed:', error);
        setErrorMessage(error.response.data.errors[0].msg);
        document.querySelector('#main-form-submit-button').disabled = false;
    }
  };

  return (
    <>
        <Card className="mx-auto" style={{ width: '24rem', padding: '10px' }} >
            <Card.Body>
                <Card.Title>Create a new relation</Card.Title>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Relation name{RequiredAsterisks}</Form.Label>
                        <Form.Control required type="text" name="relation_name" value={formData.relation_name} onChange={handleChange} placeholder="Company inc." />
                    </Form.Group>

                    <Form.Label><b>Relation contact information</b></Form.Label>

                    <Form.Group className="mb-3" controlId="formContact">
                        <Form.Label>Relation contact name{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_contact" value={formData.relation_contact} onChange={handleChange} placeholder="John Doe" />

                        <Form.Label>Relation salutation{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_salutation" value={formData.relation_salutation} onChange={handleChange} placeholder="e.g. mrs. or mr." />

                        <Form.Label>Relation contact email{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_email" value={formData.relation_email} onChange={handleChange} placeholder="johndoe@companyinc.com" />
                        
                        <Form.Label>Relation contact phone number{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_phone" value={formData.relation_phone} onChange={handleChange} placeholder="+316123456789" />
                        
                        <Form.Label>Relation address{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_address" value={formData.relation_address} onChange={handleChange} placeholder="Somestreet 19b" />
                        
                        <Form.Label>Relation postal code{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_postal_code" value={formData.relation_postal_code} onChange={handleChange} placeholder="1234 AB" />

                        <Form.Label>Relation city{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_city" value={formData.relation_city} onChange={handleChange} placeholder="Amsterdam" />

                        <Form.Label>Relation country{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_country" value={formData.relation_country} onChange={handleChange} placeholder="Netherlands" />
                    </Form.Group>

                    <Form.Label><b>Relation details</b></Form.Label>

                    <Form.Group className="mb-3" controlId="formDetails">
                        <Form.Label>Relation KVK number{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_kvk_number" value={formData.relation_kvk_number} onChange={handleChange} placeholder="123456789" />
                    
                        <Form.Label>Relation VAT number{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="relation_vat_number" value={formData.relation_vat_number} onChange={handleChange} placeholder="NL123456789B12" />

                        <Form.Label>Relation IBAN number{RequiredAsterisks}</Form.Label>
                        <Form.Control required type="text" name="relation_iban" value={formData.relation_iban} onChange={handleChange} placeholder="NL12ABCD123456789" />
                    </Form.Group>

                    { errorMessage != null ? 
                        <Alert key={'danger'} variant={'danger'}>
                            { errorMessage }
                        </Alert> 
                        : 
                        null
                    }

                    <Button variant="primary" style={{ width: "100%" }} type="submit" id="main-form-submit-button">Submit</Button>
                </Form>
            </Card.Body>
        </Card>

        <br />
    </>
  );
};

export default CreateRelation;