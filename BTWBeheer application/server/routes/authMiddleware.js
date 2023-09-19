const jwt = require('jsonwebtoken');

/**
* Authenticate the token, req.AuthCompanyId will be set to the decrypted companyId (sub)
*/
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        
        req.AuthCompanyId = decoded.sub;
        next();
    });
};

module.exports = authenticateToken;
