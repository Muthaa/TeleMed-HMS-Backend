const db = require('../config/db');

// Book an Appointment
exports.bookAppointment = (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

    db.query(
        'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
        [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled'],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Appointment booked successfully' });
        }
    );
};

// Get Appointments for a Patient
exports.getPatientAppointments = (req, res) => {
    db.query(
        'SELECT * FROM appointments WHERE patient_id = ?',
        [req.params.patient_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};

// Update Appointment Status
exports.updateAppointmentStatus = (req, res) => {
    const { status } = req.body;
    db.query(
        'UPDATE appointments SET status = ? WHERE id = ?',
        [status, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Appointment updated successfully' });
        }
    );
};

// Delete an Appointment
exports.deleteAppointment = (req, res) => {
    db.query(
        'DELETE FROM appointments WHERE id = ?',
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Appointment deleted successfully' });
        }
    );
};

// Get Appointments for a Doctor
exports.getDoctorAppointments = (req, res) => {
    db.query(
        'SELECT * FROM appointments WHERE doctor_id = ?',
        [req.params.doctor_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};
