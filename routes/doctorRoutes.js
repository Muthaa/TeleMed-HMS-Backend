const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authenticate = require('../middlewares/authenticate');


/**
 * @swagger
 * tags:
 *   name: Doctors
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Add a new doctor
 *     tags: [Doctors]
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
 *               specialization:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               schedule:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doctor added successfully
 *       500:
 *         description: Server error
 */
router.post('/add-doctor', doctorController.addDoctor);

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 *       500:
 *         description: Server error
 */
router.get('/get-all', doctorController.getAllDoctors);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Doctor data
 *       500:
 *         description: Server error
 */
router.get('/:id', doctorController.getDoctorById);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update doctor details
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialization:
 *                 type: string
 *               phone:
 *                 type: string
 *               schedule:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor profile updated successfully
 *       500:
 *         description: Server error
 */
router.put('/update-doctor/:id', authenticate, doctorController.updateDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor profile
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Doctor profile deleted
 *       500:
 *         description: Server error
 */
router.delete('/delete-doctor/:id', authenticate, doctorController.deleteDoctor);

module.exports = router;