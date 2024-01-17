const getUniqueValidMail = () => {
    //use timestamp to get a unique email address
    return `test${Math.floor(Math.random() * 1000000)}${Date.now().toString()}@test.com`;
};

const loginEmail = getUniqueValidMail();
const loginPassword = 'ValidPassword@123';

describe('Register successful', () => {
    it('Should register an account with a random valid email', () => {
      cy.visit('http://localhost:3000/Register')

      cy.get('input[name="login_mail"]').clear().type(loginEmail)
      cy.get('input[name="password"]').clear().type(loginPassword)
      cy.get('input[name="confirm_password"]').clear().type(loginPassword)
  
      cy.get('input[name="company_name"]').clear().type('Your Company Name')
      cy.get('input[name="contact_mail"]').clear().type('contact@example.com')
      cy.get('input[name="contact_phone_number"]').clear().type('31626429478')
      cy.get('input[name="bank_number"]').clear().type('NL53INGB6653222179')
      cy.get('input[name="kvk_number"]').clear().type('8932443324')
      cy.get('input[name="vat_number"]').clear().type('NL823489B01')
      cy.get('select[name="vat_declaration_interval"]').select('Quarterly')
      cy.get('input[name="address"]').clear().type('Company Address')
      cy.get('input[name="postal_code"]').clear().type('6723AB')
      cy.get('input[name="city"]').clear().type('Amsterdam')
      cy.get('input[name="country"]').clear().type('Netherlands')

      cy.get('input[name="company_logo_url"]').then(($input) => {
        cy.fixture('testlogo.png', 'base64').then((fileContent) => {
          const blob = Cypress.Blob.base64StringToBlob(fileContent)
          const testFile = new File([blob], 'your_logo.png', { type: 'image/png' })
          const dataTransfer = new DataTransfer()
  
          dataTransfer.items.add(testFile)
          $input[0].files = dataTransfer.files
          $input[0].dispatchEvent(new Event('change', { bubbles: true }))
        })
      })

      cy.wait(3000)

      cy.intercept('POST', '/api/account/register').as('formSubmission')
    
      // Submit the form
      cy.get('#main-form-submit-button').click()
  
      // Wait for the POST request to complete and then assert its status
      cy.wait('@formSubmission').then((interception) => {
        cy.wrap(interception.response.statusCode).should('eq', 200) // Adjust the status code assertion as per your application's response
        // Optionally, you can check for other response data or perform additional assertions here
      })

      cy.window().then((win) => {
        win.localStorage.setItem('email', loginEmail);
        win.localStorage.setItem('password', loginPassword);
      });
    })
})

describe('Login with Stored Credentials', () => {
    it('should login using stored credentials', () => {
        // Perform login steps using retrieved credentials
        cy.visit('http://localhost:3000/Login')

        cy.get('input[name="login_mail"]').clear().type(loginEmail)
        cy.get('input[name="password"]').clear().type(loginPassword)

        cy.intercept('POST', '/api/account/login').as('formSubmission')
        
        // Submit the form
        cy.get('#main-form-submit-button').click()

        // Wait for the POST request to complete and then assert its status
        cy.wait('@formSubmission').then((interception) => {
            cy.wrap(interception.response.statusCode).should('eq', 200) // Adjust the status code assertion as per your application's response
            // Optionally, you can check for other response data or perform additional assertions here
        })
    });
});

describe('Change logo', () => {
    it('should head settings and change logo', () => {
        // Perform login steps using retrieved credentials
        cy.visit('http://localhost:3000/Login')

        cy.get('input[name="login_mail"]').clear().type(loginEmail)
        cy.get('input[name="password"]').clear().type(loginPassword)

        cy.intercept('POST', '/api/account/login').as('formSubmission')
        
        // Submit the form
        cy.get('#main-form-submit-button').click()

        // Wait for the POST request to complete and then assert its status
        cy.wait('@formSubmission').then((interception) => {
            cy.wrap(interception.response.statusCode).should('eq', 200) // Adjust the status code assertion as per your application's response
            // Optionally, you can check for other response data or perform additional assertions here
        })

        // Perform login steps using retrieved credentials
        cy.visit('http://localhost:3000/account')

        cy.get('input[name="company_logo_url"]').then(($input) => {
            cy.fixture('testlogo2.png', 'base64').then((fileContent) => {
              const blob = Cypress.Blob.base64StringToBlob(fileContent)
              const testFile = new File([blob], 'your_logo.png', { type: 'image/png' })
              const dataTransfer = new DataTransfer()
      
              dataTransfer.items.add(testFile)
              $input[0].files = dataTransfer.files
              $input[0].dispatchEvent(new Event('change', { bubbles: true }))
            })
        })

        cy.wait(3000)

        cy.intercept('POST', '/api/account/set-company-logo').as('formSubmission')

        // Submit the form
        cy.get('#change-logo-button').click()
        
        // Wait for the POST request to complete and then assert its status
        cy.wait('@formSubmission').then((interception) => {
            cy.wrap(interception.response.statusCode).should('eq', 200) // Adjust the status code assertion as per your application's response
            // Optionally, you can check for other response data or perform additional assertions here
        })
    });
});