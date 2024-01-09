import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Card, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
  
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

const Login = () => {
  const [formData, setFormData] = useState({
    login_mail: '',
    password: '',
    confirm_password: '',
	company_name: '',
	contact_mail: '',
	contact_phone_number: '',
	bank_number: '',
	kvk_number: '',
	vat_number: '',
	vat_declaration_interval: 'quarterly',
	address: '',
	postal_code: '',
	city: '',
	country: 'Netherlands',
	default_payment_term_days: '14',
	default_quotation_validity_days: '30',
    company_logo_url: '',
    company_logo: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const base64ImageString = event.target.result;
        
        const company_logo = base64ImageString;

        console.log('File converted to base 64:', company_logo);
        setFormData({ ...formData, company_logo: company_logo, [e.target.name]: e.target.value });
      };
  
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    document.querySelector('#main-form-submit-button').disabled = true;

    console.log('Register form submitted:', formData);

    // check if passwords match
    if (formData.password !== formData.confirm_password) {
        setErrorMessage('Passwords do not match');
        document.querySelector('#main-form-submit-button').disabled = false;
        return;
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/register`, formData);
        
        if (response.status !== 200) {
            throw new Error('Register failed');
        } else {
            console.log('Register successful:', response.data);
        }

        console.log('Register successful:', response.data);

        // Redirect to the login page
        window.location.href = '/login';
    
    } catch (error) {
        console.error('Register failed:', error);
        setErrorMessage(error.response.data.errors[0].msg);
        document.querySelector('#main-form-submit-button').disabled = false;
    }
  };

  return (
    <>
        <Card className="mx-auto" style={{ width: '24rem', padding: '10px' }} >
            <Card.Img variant="top" style={{ padding: '15px' }} src="img/logoFull.svg" />
            <Card.Body>
                <Card.Title>Register</Card.Title>

                <br />

                <Form.Label><b>Account details</b></Form.Label>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Login email address{RequiredAsterisks}</Form.Label>
                        <Form.Control required type="email" name="login_mail" value={formData.login_mail} onChange={handleChange} placeholder="Enter email" />
                        
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password{RequiredAsterisks}</Form.Label>
                        <Form.Control required type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />

                        <Form.Label>Repeat password{RequiredAsterisks}</Form.Label>
                        <Form.Control required type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="Password" />
                    
                        <Form.Text className="text-muted">
                            Your password will be stored securely, and will never be shared with anyone.
                        </Form.Text>
                    </Form.Group>

                    <Form.Label><b>Company details</b></Form.Label>

                    <Form.Group className="mb-3" controlId="formCompanyDetails">
                        <Form.Label>Company name{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company name" />
                        
                        <Form.Label>Contact email address{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This email will be noted on invoices and quotations, it cannot be used for logging in." />
                        <Form.Control required type="email" name="contact_mail" value={formData.contact_mail} onChange={handleChange} placeholder="Enter email" />
                        
                        <Form.Label>Contact phone number{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This phone number will be noted on invoices and quotations." />
                        <Form.Control required type="tel" name="contact_phone_number" value={formData.contact_phone_number} onChange={handleChange} placeholder="Phone number" />
                        
                        <Form.Label>Company IBAN{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This IBAN will be stored securely and will only be noted on invoices you send." />
                        <Form.Control required type="text" name="bank_number" value={formData.bank_number} onChange={handleChange} placeholder="IBAN" />
                        
                        <Form.Label>KVK number{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="kvk_number" value={formData.kvk_number} onChange={handleChange} placeholder="KVK number" />
                        
                        <Form.Label>VAT number{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="vat_number" value={formData.vat_number} onChange={handleChange} placeholder="VAT number" />
                    
                        <Form.Label>VAT declaration interval{RequiredAsterisks}</Form.Label>
                        <InfoHover message="The standard interval is quarterly, only change if you have permission to do so by the tax authorities." />
                        <Form.Select required type="text" name="vat_declaration_interval" value={formData.vat_declaration_interval} onChange={handleChange}>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </Form.Select>
                    
                        <Form.Label>Company address{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                    
                        <Form.Label>Company postal code{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} placeholder="Postal code" />

                        <Form.Label>Company city{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                    
                        <Form.Label>Company country{RequiredAsterisks}</Form.Label>
                        <InfoHover message="This information will be noted on invoices and quotations." />
                        <Form.Control required type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
                    
                        <Form.Label>Default payment term{RequiredAsterisks}</Form.Label>
                        <InfoHover message="The payment term can later be changed individually per invoice." />
                        <Form.Control required type="number" min="1" max="365" name="default_payment_term_days" value={formData.default_payment_term_days} onChange={handleChange} placeholder="Days" />
                        
                        <Form.Label>Default quotation validity{RequiredAsterisks}</Form.Label>
                        <InfoHover message="The validity term can later be changed individually per quotation." />
                        <Form.Control required type="number" min="1" max="365" name="default_quotation_validity_days" value={formData.default_quotation_validity_days} onChange={handleChange} placeholder="Days" />
                        
                        <Form.Label>Company logo</Form.Label>
                        <InfoHover message="Your companies logo will be used on invoices and quotations." />
                        <Form.Control required type="file" name="company_logo_url" value={formData.company_logo_url} onChange={handleFileChange} accept="image/*" />
                        { formData.company_logo_url !== '' ? 
                            <>
                                <br />
                                <img src={formData.company_logo} alt="Something went wrong" className="rounded mx-auto d-block" style={{ width: '16rem' }} /> 
                            </>
                        : null }
                    </Form.Group>

                    { errorMessage != null ? 
                        <Alert key={'danger'} variant={'danger'}>
                            { errorMessage }
                        </Alert> 
                        : 
                        null
                    }

                    <Button variant="primary" style={{ width: "100%" }} type="submit" id="main-form-submit-button">Submit</Button>
                    <div className='text-center' style={{ marginTop: '10px' }}>
                        <a href="/login" style={{ textDecoration: 'none' }}>
                        Already have an account?
                        </a>
                    </div>
                </Form>
            </Card.Body>
        </Card>

        <br />
    </>
  );
};

export default Login;