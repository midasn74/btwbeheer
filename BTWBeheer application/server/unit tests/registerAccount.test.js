const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../sequelize'); 

const getUniqueValidMail = () => {
    //use timestamp to get a unique email address
    return `test${Math.floor(Math.random() * 1000000)}${Date.now().toString()}@test.com`;
};

const getValidAccount = () => {
    return {
        login_mail: getUniqueValidMail(),
        password: "PasWord!123",
        company_name: "Midas IT",
        contact_mail: "info@midasit.nl",
        contact_phone_number: "0629844300",
        bank_number: "NL66INGB9747720019",
        kvk_number: "NL128127482",
        vat_number: "84NL234234344",
        vat_declaration_interval: "monthly",
        address: "Goorstraat 14",
        postal_code: "6027NC",
        city: "Soerendonk",
        country: "Netherlands",
        default_payment_term_days: 14,
        default_quotation_validity_days: 30,
        company_logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfNSIgZGF0YS1uYW1lPSJMYXllciA1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4Mi40NSA0MC43MyI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogIzIyYjU3MzsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiAjZjVmNWY0OwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8Zz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0ibTI5LjcyLDE4LjkydjExLjcxaC0yLjQ5di03LjI4Yy0uMTYuNDUtLjQyLDEuMDMtLjgsMS43NWwtMi4wMyw0LjA4aC0xLjk4bC0yLjA3LTQuMDhjLS4zOC0uNzMtLjY0LTEuMzItLjgtMS43NXY3LjI4aC0yLjQ5di0xMS43MWgyLjY0bDIuNjcsNS4xM2MuMjEuNC40LjguNTgsMS4yMnMuMzMuNzguNDMsMS4wOWMuMTctLjU1LjUxLTEuMzMsMS4wMi0yLjMxbDIuNzItNS4xM2gyLjZaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Im0zMi40OSwyMS4wOGMtLjI0LS4xNC0uNDMtLjMyLS41OC0uNTUtLjE0LS4yMy0uMjItLjQ4LS4yMi0uNzZzLjA3LS41My4yMi0uNzdjLjE0LS4yNC4zNC0uNDIuNTgtLjU2cy41LS4yMS43OC0uMjEuNTYuMDcuOC4yMS40NC4zMy41OS41NmMuMTQuMjMuMjIuNDkuMjIuNzdzLS4wNy41My0uMjIuNzZjLS4xNC4yMy0uMzQuNDEtLjU5LjU1LS4yNS4xNC0uNTEuMjEtLjguMjFzLS41NC0uMDctLjc4LS4yMVptLS40LDkuNTV2LTguMDhsMi40NC0uMjR2OC4zMWgtMi40NFoiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0ibTQ0LjMyLDE3Ljk2djEyLjY3aC0yLjA4bC0uMTgtLjU2Yy0uOC41NC0xLjYyLjgxLTIuNDcuODEtMS4xMiwwLTEuOTctLjM1LTIuNTUtMS4wNi0uNTctLjctLjg2LTEuNzMtLjg2LTMuMDgsMC0xLjA2LjIxLTEuOTMuNjItMi42cy45NC0xLjE2LDEuNTktMS40NmMuNjUtLjMsMS4zMy0uNDUsMi4wNi0uNDUuNDUsMCwuOTIuMDcsMS40My4ydi00LjIzbDIuNDQtLjIzWm0tNS4yMiwxMC41MmMuMjUuMzcuNjQuNTYsMS4xNS41Ni4yOCwwLC41NS0uMDQuODItLjEzcy41NC0uMjEuODItLjM4di00LjQ1Yy0uMzgtLjA4LS43My0uMTMtMS4wNS0uMTMtLjY0LDAtMS4xNi4yNC0xLjU0LjcxLS4zOC40OC0uNTcsMS4xNi0uNTcsMi4wNSwwLC44LjEzLDEuMzguMzgsMS43NVoiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0ibTUyLjU2LDIyLjg1Yy41NC40Mi44LDEuMS44LDIuMDV2NS43M2gtMi4wOGwtLjItLjYzYy0uNDUuMzMtLjg5LjU1LTEuMzMuNjktLjQ0LjEzLS45LjItMS4zOS4yLS41MSwwLS45Ni0uMS0xLjM0LS4yOS0uMzktLjE5LS42OS0uNDYtLjktLjgtLjIxLS4zNC0uMzItLjc0LS4zMi0xLjE4LDAtLjk1LjQ3LTEuNjgsMS40Mi0yLjE4Ljk0LS41LDIuMTgtLjc4LDMuNy0uODR2LS4yYzAtLjM0LS4wMy0uNi0uMS0uNzktLjA3LS4xOS0uMTgtLjMzLS4zNS0uNDItLjE3LS4wOS0uNDEtLjE0LS43MS0uMTQtLjc2LDAtMS42My4zMS0yLjU5LjkybC0uOTQtMS40OGMuNjUtLjQyLDEuMjktLjczLDEuOTEtLjk0LjYyLS4yMSwxLjMtLjMxLDIuMDMtLjMxLDEuMDYsMCwxLjg2LjIxLDIuNC42MlptLTMuOTgsNi4wNWMuMTYuMTQuMzkuMjEuNy4yMS41LDAsMS4wNS0uMTYsMS42NS0uNDl2LTEuNTdjLS44OS4wNS0xLjU1LjE5LTEuOTYuNDItLjQyLjIzLS42Mi41MS0uNjIuODMsMCwuMjYuMDguNDcuMjQuNjFaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Im01Ni4yNiwzMC42Yy0uNjEtLjE5LTEuMTgtLjQ3LTEuNzEtLjg0bDEuMDMtMS41N2MuNDUuMzMuOS41NiwxLjM2LjcuNDYuMTQuOS4yMSwxLjMzLjIxLjQsMCwuNjktLjA2Ljg4LS4xOC4xOS0uMTIuMjgtLjI4LjI4LS40OSwwLS4xMy0uMDQtLjI1LS4xMS0uMzUtLjA3LS4xLS4yMi0uMi0uNDQtLjMxLS4yMi0uMS0uNTUtLjIxLS45OS0uMzNsLS41My0uMTRjLS44Ny0uMjQtMS41LS41NS0xLjg4LS45NHMtLjU3LS45MS0uNTctMS41N2MwLS41MS4xNC0uOTUuNDItMS4zNC4yOC0uMzguNjctLjY4LDEuMTctLjg5LjUxLS4yMSwxLjA4LS4zMiwxLjc0LS4zMiwxLjIzLDAsMi4zNC4zLDMuMzQuODlsLS45NSwxLjU3Yy0uNS0uMjUtLjkyLS40My0xLjI2LS41MnMtLjcxLS4xNC0xLjEtLjE0Yy0uMzEsMC0uNTMuMDUtLjY5LjE2LS4xNS4xMS0uMjMuMjUtLjIzLjQyLDAsLjEyLjAzLjIyLjA5LjMuMDYuMDguMTcuMTUuMzQuMjIuMTcuMDcuNDIuMTUuNzguMjRsLjYuMTZjLjk0LjI0LDEuNjIuNTgsMi4wNiwxLjAxcy42NS45OC42NSwxLjY0YzAsLjUyLS4xMy45OC0uMzksMS4zOS0uMjYuNDEtLjY2LjczLTEuMTkuOTctLjU0LjI0LTEuMTkuMzUtMS45Ni4zNXMtMS40Ni0uMDktMi4wNy0uMjhaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Im02Ny42OCwzMC42M3YtMTEuNzFoMi40OXYxMS43MWgtMi40OVoiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0ibTgxLjY2LDE4LjkydjIuMTloLTMuNzJ2OS41MmgtMi40OXYtOS41MmgtMy43NHYtMi4xOWg5Ljk2WiIvPgogIDwvZz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im00My44NSwxNC40YzAsLjMtLjE0LjU3LS4zNy43NC0uMTYuMTMtLjM3LjItLjU5LjItLjAzLDAtLjA2LDAtLjA5LS4wMS0uMjYtLjAyLS40OC0uMTQtLjY0LS4zMi0uMDMtLjA1LS4wNy0uMS0uMS0uMTUtLjAxLS4wMS0uMDItLjAxLS4wMi0uMDItMS42My0yLjM5LTQuMzQtMy45NS03LjQxLTMuOTUtLjY4LDAtMS4zNC4wOC0xLjk3LjIydi0uMDljMC0uNTctLjA1LTEuMTQtLjE1LTEuNjgtLjc3LTQuMzMtNC40Ni03LjYtOC45MS03LjYtMy43MiwwLTYuOTEsMi4yOS04LjMsNS41OC0uMjMuNTQtLjQyLDEuMTItLjU0LDEuNzEtLjU4LS4yOC0xLjIxLS40OS0xLjg2LS42My0uNi0uMTMtMS4yMy0uMi0xLjg4LS4yLTUsMC05LjA2LDQuMTUtOS4wNiw5LjI3czQuMDYsOS4yOCw5LjA2LDkuMjhjLjIxLDAsLjQzLDAsLjY0LS4wMi4wNS0uMDEuMTEtLjAyLjE3LS4wMmguMDNjLjI5LjAxLjU0LjE2LjcuMzguMS4xNC4xNi4zMS4xNi41LDAsLjA3LS4wMS4xNC0uMDIuMi0uMDguMzMtLjM1LjU3LS42OS42Ni0uMDEsMC0uMDIuMDEtLjAzLjAxLS4xLjAxLS4yLjAxLS4zLjAyLS4wMiwwLS4wNCwwLS4wNS4wMWgtLjA0Yy0uMTksMC0uMzgsMC0uNTcsMC02LjA5LDAtMTEuMDItNC45NC0xMS4wMi0xMS4wM1M0LjkzLDYuNDUsMTEuMDIsNi40NWMuODQsMCwxLjY1LjA5LDIuNDMuMjcsMS42OC0zLjk1LDUuNTktNi43MiwxMC4xNS02LjcyLDUuNDUsMCw5Ljk4LDMuOTUsMTAuODcsOS4xNGguMTZjMy43MSwwLDcsMS44NCw5LDQuNjYuMDEuMDIuMDMuMDQuMDQuMDcuMDIuMDIuMDQuMDQuMDUuMDYuMDguMTQuMTMuMy4xMy40N1oiLz4KICA8Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjgxLjY2IiBjeT0iMzAuMSIgcj0iLjc4Ii8+Cjwvc3ZnPg=="
    }
};

describe('POST /register', () => {
    beforeAll(async () => {
        // Initialize Sequelize and set up the database
        await sequelize.sync();
    });

    it('should return a 200 status code and a company object for valid input', async () => {
        let validAccount = getValidAccount();

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(200);
        expect(response.body.company).toBeDefined();
    });

    it('should return a 400 status code for an email without an at', async () => {
        let validAccount = getValidAccount();

        validAccount.login_mail = 'stringwithoutanatbutwithan.com';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an email without a dot', async () => {
        let validAccount = getValidAccount();

        validAccount.login_mail = 'stringwithoutanatbutwit@hancom';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an email with a space character', async () => {
        let validAccount = getValidAccount();

        validAccount.login_mail = 'somemeail@some domain.com';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an email with a space character', async () => {
        let validAccount = getValidAccount();

        validAccount.login_mail = 'some meail@somedomain.com';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an email with a space character', async () => {
        let validAccount = getValidAccount();

        validAccount.login_mail = 'somemeail@somedomain.c om';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an password which is too short <8 chars', async () => {
        let validAccount = getValidAccount();

        validAccount.password = '!2e4567';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an password which has no special character', async () => {
        let validAccount = getValidAccount();

        validAccount.password = '12345678Aa';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an password which has no lowercase character', async () => {
        let validAccount = getValidAccount();

        validAccount.password = '12345678A@';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an password which has no uppercase character', async () => {
        let validAccount = getValidAccount();

        validAccount.password = '12345678a@';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an password which has no number', async () => {
        let validAccount = getValidAccount();

        validAccount.password = 'abcdefghA@';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an invalid phone number', async () => {
        let validAccount = getValidAccount();

        validAccount.contact_phone_number = '12345';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an invalid phone number', async () => {
        let validAccount = getValidAccount();

        validAccount.contact_phone_number = '123 456';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an invalid phone number', async () => {
        let validAccount = getValidAccount();

        validAccount.contact_phone_number = '123 456';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an invalid phone number', async () => {
        let validAccount = getValidAccount();

        validAccount.contact_phone_number = '06298443o0';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an invalid IBAN', async () => {
        let validAccount = getValidAccount();

        validAccount.bank_number = 'noiban';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });

    it('should return a 400 status code for an invalid IBAN', async () => {
        let validAccount = getValidAccount();

        validAccount.bank_number = 'GB94BARC20201530093459';

        const response = await request(app)
            .post('/api/account/register')
            .send(validAccount);

        expect(response.status).toBe(400);
    });
});
