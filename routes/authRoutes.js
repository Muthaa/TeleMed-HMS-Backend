const express = require('express');
<<<<<<< HEAD
const { register, login, logout } = require('../controllers/authController');
=======
const { register, login, getUserDetails, logout } = require('../controllers/authController');
>>>>>>> 98121c5 (update backend security features)
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
<<<<<<< HEAD
=======
 * /auth/me:
 *   get:
 *     summary: Retrieve authenticated user details
 *     description: Fetches details of the currently logged-in user using session authentication.
 *     tags: [Auth]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 first_name:
 *                   type: string
 *                   example: "John"
 *                 last_name:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 role:
 *                   type: string
 *                   enum: [admin, doctor, patient]
 *                   example: "patient"
 *       401:
 *         description: Unauthorized – No active session found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal Server Error – Unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.get("/me", getUserDetails);

/**
 * @swagger
>>>>>>> 98121c5 (update backend security features)
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient registered successfully
 *       500:
 *         description: Server error
<<<<<<< HEAD
=======
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "An error occurred while registering user"
>>>>>>> 98121c5 (update backend security features)
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', logout);

module.exports = router;