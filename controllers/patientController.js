const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.getPatient = (req, res) => {
    db.query('SELECT first_name, last_name, email, phone, date_of_birth, gender, address FROM patients WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

exports.updatePatient = (req, res) => {
    const { phone, address } = req.body;
    db.query('UPDATE patients SET phone = ?, address = ? WHERE id = ?', [phone, address, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Profile updated successfully' });
    });
};

exports.deletePatient = (req, res) => {
    db.query('DELETE FROM patients WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Patient account deleted' });
    });
};