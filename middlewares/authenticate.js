<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
=======
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   console.log("Received Authorization Header:", req.headers.authorization);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Debugging
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authenticate;

const authenticate = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized access. Please log in." });
  }

  console.log("Authenticated User:", req.session.user); // Debugging
  req.user = req.session.user; // Attach user details to request
  next();
>>>>>>> 98121c5 (update backend security features)
};

module.exports = authenticate;
