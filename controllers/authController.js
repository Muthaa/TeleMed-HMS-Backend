const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [first_name, last_name, email, hash, phone, date_of_birth, gender, address],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Patient registered successfully' });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM patients WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, results[0].password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    req.session.patientId = results[0].id;
    res.json({ message: 'Login successful' });
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
};
