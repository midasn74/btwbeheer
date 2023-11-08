const jwt = require('jsonwebtoken');
const authenticateToken = require('../../routes/Authentication/tokenAuthentication');

const dotenv = require('dotenv');
dotenv.config();

describe('authenticateToken middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn(),
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should set req.AuthCompanyId if a valid token is provided', () => {
        const validToken = jwt.sign({ sub: '12345' }, process.env.SECRET_KEY);

        req.header.mockReturnValue(`${validToken}`);

        authenticateToken(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.AuthCompanyId).toBe('12345');
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should return a 401 response if no token is provided', () => {
        req.header.mockReturnValue(null);

        authenticateToken(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(req.AuthCompanyId).toBeUndefined();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Access denied' });
    });

    it('should return a 403 response if an invalid token is provided', () => {
        const invalidToken = 'invalidToken';

        req.header.mockReturnValue(`Bearer ${invalidToken}`);

        authenticateToken(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(req.AuthCompanyId).toBeUndefined();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    });
});