import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

import fetchRelationsData from '../api/getRelations';

import { getCompanyId, getJWT } from '../utils/auth';

const RequiredAsterisks = (
    <element class="text-danger">*</element>
)

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    company_id: getCompanyId(),
    relation_id: '', // You'll need to set the relation ID based on the selected relation
    invoice_description: '',
    creation_date: '',
    due_date: '',
    payment_term_days: '',
  });

  const [relations, setRelations] = useState(null); 

  useEffect(() => {
      fetchRelationsData(data => {
          if (!data) return;

          // Modify the data here by renaming 'relation_id' to 'id'
          const modifiedData = data.map(item => ({
              id: item.relation_id,
              ...item
          }));
    
          // Set the modified data in the state
          setRelations(modifiedData);
      });
  }, []);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

      // Update the form data for relation_id differently to store only the ID
  if (name === 'relation_id') {
    const selectedRelation = relations.find(relation => relation.id === value);
    const relationId = selectedRelation ? selectedRelation.id : ''; // Get the selected relation's ID

    updatedFormData = {
      ...updatedFormData,
      relation_id: relationId,
    };
  } else {
    // Rest of your existing code to handle other form inputs
    // ...
    // Remember to include this part too in the handleChange function
    updatedFormData = { ...updatedFormData, [name]: value };
    // ...
  }
  
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

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    product_name: '',
    quantity: '',
    price_per_unit_ex_vat: '',
    vat_percentage: '',
    discount_percentage: '',
  });

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    // Create a new item object based on the newItem state
    const newItemData = { ...newItem };

    // Add the new item to the items array
    setItems([...items, newItemData]);

    // Clear the newItem state for the next input
    setNewItem({
      product_name: '',
      quantity: '',
      price_per_unit_ex_vat: '',
      vat_percentage: '',
      discount_percentage: '',
    });
  };

  return (
    <>
      <Card className="mx-auto" style={{ width: '24rem', padding: '10px' }}>
        <Card.Body>
          <Card.Title>Create a new invoice</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formRelation">
              <Form.Label>Relation{RequiredAsterisks}</Form.Label>
              {/* Implement a way to select the relation or fetch relations to choose from */}
              <Form.Select required name="relation_id" value={formData.relation_id} onChange={handleChange} placeholder="Enter Relation ID">
                {relations?.map(relation => (
                    <option value={relation.id}>{relation.relation_name} - {relation.relation_kvk_number}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Invoice Description{RequiredAsterisks}</Form.Label>
              <Form.Control required type="text" name="invoice_description" value={formData.invoice_description} onChange={handleChange} placeholder="Enter Description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDates">
              <Form.Label>Creation Date{RequiredAsterisks}</Form.Label>
            <Form.Control required type="date" name="creation_date" value={formData.creation_date} onChange={handleChange} />

            <Form.Label>Due Date{RequiredAsterisks}</Form.Label>
              <Form.Control required type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPayment">
              <Form.Label>Payment Term (days){RequiredAsterisks}</Form.Label>
              <Form.Control required type="number" name="payment_term_days" value={formData.payment_term_days} onChange={handleChange} />
            </Form.Group>

            
      <Form.Group className="mb-3" controlId="formAddItem">
        <Form.Label>Add Item to Invoice</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control className="me-2" type="text" name="product_name" value={newItem.product_name} onChange={handleNewItemChange} placeholder="Product Name" />
          <Form.Control className="me-2" type="text" name="quantity" value={newItem.quantity} onChange={handleNewItemChange} placeholder="Quantity" />
          <Form.Control className="me-2" type="text" name="price_per_unit_ex_vat" value={newItem.price_per_unit_ex_vat} onChange={handleNewItemChange} placeholder="Price per Unit ex VAT" />
          <Form.Control className="me-2" type="text" name="vat_percentage" value={newItem.vat_percentage} onChange={handleNewItemChange} placeholder="VAT Percentage" />
          <Form.Control className="me-2" type="text" name="discount_percentage" value={newItem.discount_percentage} onChange={handleNewItemChange} placeholder="Discount Percentage" />
          <Button variant="success" onClick={handleAddItem}>+</Button>
        </div>
      </Form.Group>

      {items.length > 0 && (
        <div>
          <h5>Added Items:</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price per Unit ex VAT</th>
                <th>VAT Percentage</th>
                <th>Discount Percentage</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price_per_unit_ex_vat}</td>
                  <td>{item.vat_percentage}</td>
                  <td>{item.discount_percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
