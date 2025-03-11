const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Patients
 */

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get patient details
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient details retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/get-patient/:id', authenticate, patientController.getPatient);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update patient profile
 *     tags: [Patients]
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
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       500:
 *         description: Server error
 */
router.put('/update-patient/:id', authenticate, patientController.updatePatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete patient account
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient account deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/delete-patient/:id', authenticate, patientController.deletePatient);

module.exports = router;