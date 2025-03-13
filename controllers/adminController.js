const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Add a New Admin
exports.addAdmin = async (req, res) => {
    const { username, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO admin (username, password_hash, role) VALUES (?, ?, ?)',
        [username, hash, role],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Admin created successfully' });
        }
    );
};

<<<<<<< HEAD
// Admin Login
exports.loginAdmin = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM admin WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, results[0].password_hash);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT Token
        const token = jwt.sign({ adminId: results[0].id, role: results[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Admin login successful', token });
    });
};

// Admin Logout
exports.logoutAdmin = (req, res) => {
    req.session.destroy();
    res.json({ message: 'Admin logged out successfully' });
};

=======
// Admin Login (Session-Based)
exports.loginAdmin = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.query('SELECT * FROM admin WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = results[0];
        const match = await bcrypt.compare(password, admin.password_hash);

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // ✅ Store admin details in session
        req.session.admin = {
            id: admin.id,
            username: admin.username,
            role: admin.role
        };

        return res.json({
            message: 'Admin login successful',
            admin: req.session.admin // Return session-stored admin data
        });
    });
};


// Admin Logout (Session-Based)
exports.logoutAdmin = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ error: "Failed to log out" });
        }
        res.clearCookie('connect.sid'); // Clears the session cookie
        res.json({ message: "Admin logged out successfully" });
    });
};


>>>>>>> 98121c5 (update backend security features)
// Get All Appointments
exports.getAllAppointments = (req, res) => {
    db.query('SELECT * FROM appointments', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get All Doctors
exports.getAllDoctors = (req, res) => {
    db.query('SELECT * FROM doctors', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
