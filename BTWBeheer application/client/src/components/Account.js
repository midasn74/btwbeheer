import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { getJWT } from '../utils/auth';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    document.querySelector('#change-password-button').disabled = true;

    // check if new passwords match
    if (formData.new_password !== formData.confirm_new_password) {
      setErrorMessage('New passwords do not match');
      document.querySelector('#change-password-button').disabled = false;
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/change-password`, formData, {
            headers: {
                'Authorization': getJWT()
            }
        });

      if (response.status !== 200) {
        throw new Error('Password change failed');
      } else {
        console.log('Password changed successfully:', response.data);
      }

      // Redirect to a success page or show a success message
      window.location.href = '/';
    } catch (error) {
      console.error('Password change failed:', error);
      setErrorMessage('Password change failed. Please try again.');
      document.querySelector('#change-password-button').disabled = false;
    }
  };

  return (
    <>
      <Card className="mx-auto" style={{ width: '24rem', padding: '10px' }}>

      <Button
            variant="danger"
            style={{ position: 'absolute', top: '10px', right: '10px' }}
            onClick={() => (window.location.href = '/')}
        >
            Return
        </Button>

        <Card.Body>
          <Card.Title>Change Password</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="old_password"
                value={formData.old_password}
                onChange={handleChange}
                placeholder="Old Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="New Password"
              />

              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="confirm_new_password"
                value={formData.confirm_new_password}
                onChange={handleChange}
                placeholder="Confirm New Password"
              />
            </Form.Group>

            {errorMessage != null ? (
              <Alert key={'danger'} variant={'danger'}>
                {errorMessage}
              </Alert>
            ) : null}

            <Button variant="primary" style={{ width: '100%' }} type="submit" id="change-password-button">
              Change Password
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <br />
    </>
  );
};

export default ChangePassword;
