const jwt = require('jsonwebtoken');

/**
 * Middleware: verifyToken
 * Reads the JWT from the Authorization header (Bearer <token>)
 * or falls back to the "token" cookie.
 * Attaches the decoded payload to req.user on success.
 */
const verifyToken = (req, res, next) => {
    let token;

    // 1. Try Authorization header first (stateless clients / mobile)
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    // 2. Fall back to httpOnly cookie (browser clients)
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // { email, iat, exp }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = { verifyToken };
