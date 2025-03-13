const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authenticate = require('../middlewares/authenticate');

<<<<<<< HEAD

=======
>>>>>>> 98121c5 (update backend security features)
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
<<<<<<< HEAD
 *               phone:
 *                 type: string
=======
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
 *               license_number:
 *                 type: string
>>>>>>> 98121c5 (update backend security features)
 *               schedule:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doctor added successfully
 *       500:
 *         description: Server error
 */
<<<<<<< HEAD
router.post('/add-doctor', doctorController.addDoctor);
=======
router.post('/add-doctor', authenticate, doctorController.addDoctor);
>>>>>>> 98121c5 (update backend security features)

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
<<<<<<< HEAD
router.get('/get-all', doctorController.getAllDoctors);
=======
router.get('/get-all', authenticate, doctorController.getAllDoctors);
>>>>>>> 98121c5 (update backend security features)

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
<<<<<<< HEAD
router.get('/:id', doctorController.getDoctorById);
=======
router.get('/:id', authenticate, doctorController.getDoctorById);
>>>>>>> 98121c5 (update backend security features)

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