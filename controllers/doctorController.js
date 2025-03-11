const db = require('../config/db');

exports.addDoctor = (req, res) => {
  const { first_name, last_name, specialization, email, phone, schedule } = req.body;
  db.query(
    'INSERT INTO doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)',
    [first_name, last_name, specialization, email, phone, schedule],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Doctor added successfully' });
    }
  );
};

exports.getAllDoctors = (req, res) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getDoctorById = (req, res) => {
  db.query('SELECT * FROM doctors WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.updateDoctor = (req, res) => {
  const { specialization, phone, schedule } = req.body;
  db.query('UPDATE doctors SET specialization = ?, phone = ?, schedule = ? WHERE id = ?',
    [specialization, phone, schedule, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Doctor profile updated successfully' });
    }
  );
};

exports.deleteDoctor = (req, res) => {
  db.query('DELETE FROM doctors WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Doctor profile deleted' });
  });
};