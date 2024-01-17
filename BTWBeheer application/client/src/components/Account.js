import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { getJWT } from '../utils/auth';
import fetchCompanyData from '../api/getCompany';

const ChangePassword = () => {
  // Password
  const [formDataPassword, setFormDataPassword] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  });

  const [errorMessagePassword, setErrorMessagePassword] = useState(null);

  const handleChangePassword = (e) => {
    setFormDataPassword({ ...formDataPassword, [e.target.name]: e.target.value });
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    document.querySelector('#change-password-button').disabled = true;

    // check if new passwords match
    if (formDataPassword.new_password !== formDataPassword.confirm_new_password) {
      setErrorMessagePassword('New passwords do not match');
      document.querySelector('#change-password-button').disabled = false;
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/change-password`, formDataPassword, {
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
      setErrorMessagePassword('Password change failed. Please try again.');
      document.querySelector('#change-password-button').disabled = false;
    }
  };

  const [company, setCompany] = useState(null);

  // Logo
  const [formDataLogo, setFormDataLogo] = useState({
    company_logo_url: '',
    company_logo: '',
  });

  useEffect(() => {
    fetchCompanyData(setCompany);
  }, []);

  const [errorMessageLogo, setErrorMessageLogo] = useState(null);

  const handleChangeLogo = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const base64ImageString = event.target.result;
        
        const company_logo = base64ImageString;

        console.log('File converted to base 64:', company_logo);
        setFormDataLogo({ ...formDataLogo, company_logo: company_logo, [e.target.name]: e.target.value });
      };
  
      reader.readAsDataURL(file);
    }

    setFormDataLogo({ ...formDataLogo, [e.target.name]: e.target.value });
  };

  const handleSubmitLogo = async (e) => {
    e.preventDefault();

    document.querySelector('#change-logo-button').disabled = true;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/set-company-logo`, formDataLogo, {
            headers: {
                'Authorization': getJWT()
            }
        });

      if (response.status !== 200) {
        throw new Error('Logo change failed');
      } else {
        console.log('Logo changed successfully:', response.data);
      }

      // Redirect to a success page or show a success message
      window.location.href = '/';
    } catch (error) {
      console.error('Logo change failed:', error);
      setErrorMessageLogo('Logo change failed. Please try again.');
      document.querySelector('#change-logo-button').disabled = false;
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
          <Card.Title>Change password</Card.Title>

          <Form onSubmit={handleSubmitPassword}>
            <Form.Group className="mb-3" controlId="formOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="old_password"
                value={formDataPassword.old_password}
                onChange={handleChangePassword}
                placeholder="Old Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="new_password"
                value={formDataPassword.new_password}
                onChange={handleChangePassword}
                placeholder="New Password"
              />

              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="confirm_new_password"
                value={formDataPassword.confirm_new_password}
                onChange={handleChangePassword}
                placeholder="Confirm New Password"
              />
            </Form.Group>

            {errorMessagePassword != null ? (
              <Alert key={'danger'} variant={'danger'}>
                {errorMessagePassword}
              </Alert>
            ) : null}

            <Button variant="primary" style={{ width: '100%' }} type="submit" id="change-password-button">
              Change password
            </Button>
          </Form>
        </Card.Body>

        <hr/>

        <Card.Body>
          <Card.Title>Change logo</Card.Title>

          <Form onSubmit={handleSubmitLogo}>
            <Form.Group className="mb-3" controlId="formNewLogo">
                <Form.Label>Company logo</Form.Label>
                    <Form.Control required type="file" name="company_logo_url" value={formDataLogo.company_logo_url} onChange={handleChangeLogo} accept="image/*" />
                    { formDataLogo.company_logo_url !== '' ? 
                        <>
                            <br />
                            <img src={formDataLogo.company_logo} alt="Something went wrong" className="rounded mx-auto d-block" style={{ width: '16rem' }} /> 
                        </>
                    : 
                        <>
                            <br />
                            <img src={company?.company_logo} alt="Something went wrong" className="rounded mx-auto d-block" style={{ width: '16rem' }} /> 
                        </>
                    }
            </Form.Group>

            {errorMessageLogo != null ? (
              <Alert key={'danger'} variant={'danger'}>
                {errorMessageLogo}
              </Alert>
            ) : null}

            <Button variant="primary" style={{ width: '100%' }} type="submit" id="change-logo-button">
              Change logo
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <br />
    </>
  );
};

export default ChangePassword;
