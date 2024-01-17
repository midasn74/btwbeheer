import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Card, Alert } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    login_mail: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Login form submitted:', formData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/login`, formData);
      const { token } = response.data;

      // Store the token in local storage or a secure cookie
      localStorage.setItem('token', token);

      // Redirect to the dashboard
        window.location.href = '/';
    
    } catch (error) {
        console.error('Login failed:', error);
        setErrorMessage(error.response.data.error);
    }
  };

  return (
    <>

        <Card className="mx-auto" style={{ width: '24rem', padding: '10px' }} >
            <Card.Img variant="top" style={{ padding: '15px' }} src="img/logoFull.svg" />
            <Card.Body>
                <Card.Title>Login</Card.Title>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="login_mail" value={formData.login_mail} onChange={handleChange} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>

                    { errorMessage != null ? 
                        <Alert key={'danger'} variant={'danger'}>
                            { errorMessage }
                        </Alert> 
                        : 
                        null
                    }

                    <Button id="main-form-submit-button" variant="primary" style={{ width: "100%" }} type="submit">Submit</Button>
                    <div className='text-center' style={{ marginTop: '10px' }}>
                        <a href="/register" style={{ textDecoration: 'none' }}>
                        Create an account
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
