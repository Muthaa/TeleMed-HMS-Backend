const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

<<<<<<< HEAD
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
=======
exports.getUserDetails = (req, res) => {
  try {
    // Ensure session exists and user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    return res.json(req.session.user); // Return stored session user data
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res) => {
    const { email, password, first_name, last_name, date_of_birth, phone, gender, address } = req.body;

    try {
        // Check if email already exists
        db.query("SELECT id FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            if (results.length > 0) {
                return res.status(409).json({ message: "Email already registered. Please use a different email." });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            db.query(
                "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, 'patient')",
                [first_name, last_name, email, hashedPassword],
                (userErr, result) => {
                    if (userErr) {
                        console.error("Database insertion error:", userErr);
                        return res.status(500).json({ message: "Failed to register user." });
                    }

                    const userId = result.insertId;

                    // Insert into patients table
                    db.query(
                        "INSERT INTO patients (user_id, first_name, last_name, date_of_birth, phone, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        [userId, first_name, last_name, date_of_birth, phone, gender, address],
                        (patientErr) => {
                            if (patientErr) {
                                console.error("Error inserting into patients table:", patientErr);
                                return res.status(500).json({ message: "Failed to complete patient registration." });
                            }

                            return res.status(201).json({ message: "User registered successfully" });
                        }
                    );
                }
            );
        });
    } catch (error) {
        console.error("Unexpected error in registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = users[0];

        if (!user.password) {
            return res.status(500).json({ message: "User data is incomplete. Contact admin." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // ✅ Store user details in session (persists across requests)
        req.session.user = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        };

        console.log("User logged in:", req.session.user);

        res.json({ 
            message: "Login successful",
            user: req.session.user // Send session-based user data
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid", { path: "/" }); // Clears the session cookie
    res.json({ message: "Logged out successfully" });
  });
>>>>>>> 98121c5 (update backend security features)
};
