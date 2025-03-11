const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Admin
 */

/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       500:
 *         description: Server error
 */
router.post('/add-admin', adminController.addAdmin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', adminController.loginAdmin);

/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: Admin logout
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin logged out successfully
 */
router.post('/logout', authenticate, adminController.logoutAdmin);

// Admin Management Routes

/**
 * @swagger
 * /admin/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all appointments
 *       500:
 *         description: Server error
 */
router.get('/appointments', authenticate, adminController.getAllAppointments);

/**
 * @swagger
 * /admin/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all doctors
 *       500:
 *         description: Server error
 */
router.get('/doctors', authenticate, adminController.getAllDoctors);

module.exports = router;
