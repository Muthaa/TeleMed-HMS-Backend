const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authenticate = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Appointments
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Book an appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *               doctor_id:
 *                 type: integer
 *               appointment_date:
 *                 type: string
 *                 format: date
 *               appointment_time:
 *                 type: string
 *                 format: time
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       500:
 *         description: Server error
 */
router.post('/book', authenticate, appointmentController.bookAppointment);

/**
 * @swagger
 * /appointments/patient/{patient_id}:
 *   get:
 *     summary: Get all appointments for a patient
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: patient_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of appointments for the patient
 *       500:
 *         description: Server error
 */
router.get('/:patient_id', authenticate, appointmentController.getPatientAppointments);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update appointment status
 *     tags: [Appointments]
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
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       500:
 *         description: Server error
 */
router.put('/update/:id', authenticate, appointmentController.updateAppointmentStatus);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/delete/:id', authenticate, appointmentController.deleteAppointment);

/**
 * @swagger
 * /appointments/doctor/{doctor_id}:
 *   get:
 *     summary: Get all appointments for a doctor
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctor_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of appointments for the doctor
 *       500:
 *         description: Server error
 */
router.get('/doctor/:doctor_id', authenticate, appointmentController.getDoctorAppointments);

module.exports = router;
