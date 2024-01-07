import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

import { getCompanyId, getJWT } from '../utils/auth';

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    company_id: getCompanyId(),
    relation_id: '', // You'll need to set the relation ID based on the selected relation
    invoice_description: '',
    creation_date: '',
    due_date: '',
    payment_term_days: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
  
    if (name === 'payment_term_days') {
      if (!isNaN(value) && parseInt(value) >= 0) {
        const creationDate = formData.creation_date;
        if (creationDate !== '') {
          const dueDate = new Date(creationDate);
          dueDate.setDate(dueDate.getDate() + parseInt(value));
          updatedFormData = { ...updatedFormData, due_date: dueDate.toISOString().split('T')[0] };
        }
      } else {
        // Handle invalid input for payment term here
        // For instance, show an error message or handle it accordingly
        // For simplicity, let's set it to an empty string
        updatedFormData = { ...updatedFormData, due_date: '', payment_term_days: '' };
      }
    } else if (name === 'due_date') {
      const creationDate = formData.creation_date;
      const enteredDueDate = new Date(value);
      const today = new Date();
  
      if (enteredDueDate > today && creationDate !== '') {
        const diffTime = Math.abs(enteredDueDate - new Date(creationDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        updatedFormData = { ...updatedFormData, payment_term_days: diffDays.toString() };
      } else {
        // Handle invalid input for due date here
        // For instance, show an error message or handle it accordingly
        // For simplicity, let's set it to an empty string
        updatedFormData = { ...updatedFormData, due_date: '', payment_term_days: '' };
      }
    } else if (name === 'creation_date') {
      const enteredCreationDate = new Date(value);
      const enteredDueDate = new Date(formData.due_date);
      const today = new Date();
  
      if (enteredCreationDate <= today && enteredCreationDate < enteredDueDate) {
        const diffTime = Math.abs(enteredDueDate - enteredCreationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        updatedFormData = { ...updatedFormData, payment_term_days: diffDays.toString() };
      } else {
        // Handle invalid input for creation date here
        // For instance, show an error message or handle it accordingly
        // For simplicity, let's set it to an empty string
        updatedFormData = { ...updatedFormData, due_date: '', payment_term_days: '' };
      }
    }
  
    setFormData(updatedFormData);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    document.querySelector('#main-form-submit-button').disabled = true;

    console.log('Invoice creation form submitted:', formData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/invoices/`, formData, {
        headers: {
          'Authorization': getJWT()
        }
      });

      if (response.status !== 200) {
        throw new Error('Invoice creation failed');
      } else {
        console.log('Invoice creation successful:', response.data);
      }

        // Redirect to a success page or show a success message
        window.location.href = '/Invoicing';
    } catch (error) {
      console.error('Invoice creation failed:', error);
      setErrorMessage(error.response.data.errors[0].msg);
      document.querySelector('#main-form-submit-button').disabled = false;
    }
  };

  return (
    <>
      <Card className="mx-auto" style={{ width: '24rem', padding: '10px' }}>
        <Card.Body>
          <Card.Title>Create a new invoice</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formRelation">
              <Form.Label>Relation ID</Form.Label>
              {/* Implement a way to select the relation or fetch relations to choose from */}
              <Form.Control required type="text" name="relation_id" value={formData.relation_id} onChange={handleChange} placeholder="Enter Relation ID" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Invoice Description</Form.Label>
              <Form.Control required type="text" name="invoice_description" value={formData.invoice_description} onChange={handleChange} placeholder="Enter Description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDates">
              <Form.Label>Creation Date</Form.Label>
            <Form.Control required type="date" name="creation_date" value={formData.creation_date} onChange={handleChange} />

            <Form.Label>Due Date</Form.Label>
              <Form.Control required type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPayment">
              <Form.Label>Payment Term (days)</Form.Label>
              <Form.Control required type="number" name="payment_term_days" value={formData.payment_term_days} onChange={handleChange} />
            </Form.Group>

            {errorMessage !== null ?
              <Alert key={'danger'} variant={'danger'}>
                {errorMessage}
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

export default CreateInvoice;
