import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';

import fetchRelationsData from '../api/getRelations';

import { getCompanyId, getJWT } from '../utils/auth';

const RequiredAsterisks = (
  <span className="text-danger">*</span>
);

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    company_id: getCompanyId(),
    relation_id: '',
    invoice_description: '',
    creation_date: '',
    due_date: '',
    payment_term_days: '',
  });

  const [relations, setRelations] = useState(null);

  useEffect(() => {
    fetchRelationsData(data => {
      if (!data) return;

      const modifiedData = data.map(item => ({
        id: item.relation_id,
        ...item
      }));

      setRelations(modifiedData);
    });
  }, []);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'relation_id') {
      const selectedRelation = relations.find(relation => relation.id === value);
      const relationId = selectedRelation ? selectedRelation.id : '';

      updatedFormData = {
        ...updatedFormData,
        relation_id: relationId,
      };
    } else {
      updatedFormData = { ...updatedFormData, [name]: value };
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
        updatedFormData = { ...updatedFormData, due_date: '', payment_term_days: '' };
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    document.querySelector('#main-form-submit-button').disabled = true;

    console.log('Invoice creation form submitted:', formData);

    let response;

    try {
      response = await axios.post(`${process.env.REACT_APP_API_URL}/invoices/`, formData, {
        headers: {
          'Authorization': getJWT()
        }
      });

      if (response.status !== 200) {
        throw new Error('Invoice creation failed');
      } else {
        console.log('Invoice creation successful:', response.data);
      }
    } catch (error) {
      console.error('Invoice creation failed:', error);
      setErrorMessage(error.response.data.errors[0].msg);
      document.querySelector('#main-form-submit-button').disabled = false;

      return;
    }

    // Prepare data for product creation
    const productData = parseItemsForSubmission(response.data.invoice.invoice_id, null);

    console.log(productData)

    // Loop through the product data and create products
    for (const product of productData) {
        try {
            const productResponse = await axios.post(`${process.env.REACT_APP_API_URL}/products/`, product, {
                headers: {
                'Authorization': getJWT()
                }
            });
            console.log(productResponse)
            
            if (productResponse.status !== 200) {
                throw new Error('Product creation failed');
            } else {
                console.log('Product creation successful:', productResponse.data);
            }
        } catch (productError) {
            console.error('Product creation failed:', productError);
            // Handle product creation error
        }
    }

    // Redirect or perform other actions after invoice and product creation
    //window.location.href = '/Invoicing';
  };

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    product_name: '',
    quantity: '',
    price_per_unit_ex_vat: '',
    vat_percentage: '',
    discount_percentage: '',
  });

  const [totalPerProduct, setTotalPerProduct] = useState([]);
  const [totalAllProducts, setTotalAllProducts] = useState(0);

  useEffect(() => {
    const calculateTotalPerProduct = () => {
      const totals = items.map(item => {
        const priceExVat = parseFloat(item.price_per_unit_ex_vat) || 0;
        const quantity = parseFloat(item.quantity) || 0;
        const vatPercentage = parseFloat(item.vat_percentage) || 0;
        const discountPercentage = parseFloat(item.discount_percentage) || 0;

        const price = priceExVat * (1 + vatPercentage / 100) * (1 - discountPercentage / 100);

        return (price * quantity).toFixed(2);
      });

      setTotalPerProduct(totals);
    };

    calculateTotalPerProduct();
  }, [items]);

  useEffect(() => {
    const calculateTotalAllProducts = () => {
      const totalAll = totalPerProduct.reduce((acc, total) => acc + parseFloat(total), 0);
      setTotalAllProducts(totalAll.toFixed(2));
    };

    calculateTotalAllProducts();
  }, [totalPerProduct]);

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItemData = { ...newItem };
    setItems([...items, newItemData]);
    setNewItem({
      product_name: '',
      quantity: '',
      price_per_unit_ex_vat: '',
      vat_percentage: '',
      discount_percentage: '',
    });
  };

  const parseItemsForSubmission = (invoiceId, quotationId) => {
    return items.map((item, index) => {
      return {
        company_id: getCompanyId(),
        invoice_id: invoiceId,
        quotation_id: quotationId,
        product_description: item.product_name,
        quantity: item.quantity,
        price_per_unit_ex_vat: item.price_per_unit_ex_vat,
        vat_percentage: item.vat_percentage,
        discount_percentage: item.discount_percentage,
      };
    });
  };

  return (
    <>
      <Card className="mx-auto" style={{ width: '64rem', padding: '10px' }}>

      <Button
        variant="danger"
        style={{ position: 'absolute', top: '10px', right: '10px' }}
        onClick={() => (window.location.href = '/Invoicing')}
      >
        Return
      </Button>

        <Card.Body>
          <Card.Title>Create a new invoice</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formRelation">
              <Form.Label>Relation{RequiredAsterisks}</Form.Label>
              <Form.Select required name="relation_id" value={formData.relation_id} onChange={handleChange} placeholder="Enter Relation">
                <option disabled>
                    
                </option>
                {relations?.map(relation => (
                  <option key={relation.id} value={relation.id}>
                    {relation.relation_name} - {relation.relation_kvk_number}
                  </option>
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
                <Form.Control style={{ width: "100px" }} className="me-2" type="text" name="quantity" value={newItem.quantity} onChange={handleNewItemChange} placeholder="Quantity" />
                <InputGroup className="me-2">
                  <InputGroup.Text>€</InputGroup.Text>
                  <Form.Control type="text" name="price_per_unit_ex_vat" value={newItem.price_per_unit_ex_vat} onChange={handleNewItemChange} placeholder="Price (p/pc ex VAT)" />
                </InputGroup>
                <InputGroup className="me-2">
                  <Form.Control type="text" name="vat_percentage" value={newItem.vat_percentage} onChange={handleNewItemChange} placeholder="VAT" />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
                <InputGroup className="me-2" >
                  <Form.Control type="text" name="discount_percentage" value={newItem.discount_percentage} onChange={handleNewItemChange} placeholder="Discount" />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
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
                      <th>Total per Product</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.product_name}</td>
                        <td>{item.quantity}</td>
                        <td>€{item.price_per_unit_ex_vat}</td>
                        <td>{item.vat_percentage}%</td>
                        <td>{item.discount_percentage}%</td>
                        <td>€{totalPerProduct[index]}</td>
                        <td>
                          <Button variant="danger" onClick={() => handleRemoveItem(index)}>-</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5>Total €{totalAllProducts}</h5>
              </div>
            )}

            <br />

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
