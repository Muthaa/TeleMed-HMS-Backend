const db = require('../config/db');

<<<<<<< HEAD
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
=======

exports.addDoctor = async (req, res) => {
    const { email, password, first_name, last_name, specialization, phone, date_of_birth, gender, address, license_number, schedule, admin_id } = req.body;

    db.query("SELECT role FROM users WHERE id = ?", [admin_id], async (err, results) => {
        if (err || results.length === 0 || results[0].role !== 'admin') {
            return res.status(403).json({ error: "Unauthorized. Only admins can create doctors." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, 'doctor')",
            [first_name, last_name, email, hashedPassword],
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });

                const userId = result.insertId;
                db.query(
                    "INSERT INTO doctors (user_id, admin_id, first_name, last_name, specialization, phone, date_of_birth, gender, address, license_number, schedule) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [userId, admin_id, first_name, last_name, specialization, phone, date_of_birth, gender, address, license_number, schedule]
                );
                res.status(201).json({ message: "Doctor added successfully" });
            }
        );
    });
>>>>>>> 98121c5 (update backend security features)
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