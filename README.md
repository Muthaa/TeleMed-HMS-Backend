# TeleMed-HMS
# Healthcare Management System

## Overview
The TeleMed Healthcare Management System is a Node.js and MySQL-based API that allows patients to book appointments, doctors to manage schedules, and admins to oversee operations.

## Features
- **Patient Management**: Registration, login, profile updates, and account deletion.
- **Doctor Management**: Adding doctors, updating profiles, and retrieving doctor details.
- **Appointment Management**: Booking, updating status, and deleting appointments.
- **Admin Controls**: Managing users, viewing appointments, and logging in securely.
- **Authentication & Authorization**: Secure JWT-based authentication.
- **Swagger Documentation**: API documentation with Swagger.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, bcrypt
- **Documentation**: Swagger
- **Hosting**: cPanel-supported Node.js deployment

## Installation
### Prerequisites
- Node.js installed
- MySQL database set up

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/healthcare-management.git
   cd healthcare-management
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure the `.env` file:
   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

4. Set up the database:
   - Import the SQL schema from `database/schema.sql`.

5. Start the server:
   ```sh
   npm start
   ```

## API Documentation
Swagger documentation is available at:
```
http://localhost:3000/api-docs
```

## API Endpoints
### Authentication
- `POST /auth/register` - Register a new patient
- `POST /auth/login` - Patient login
- `POST /auth/logout` - Logout user

### Patients
- `GET /patients/:id` - Get patient details
- `PUT /patients/:id` - Update patient details
- `DELETE /patients/:id` - Delete patient account

### Doctors
- `POST /doctors` - Add a new doctor
- `GET /doctors` - Get all doctors
- `GET /doctors/:id` - Get a doctor by ID
- `PUT /doctors/:id` - Update doctor details
- `DELETE /doctors/:id` - Delete doctor profile

### Appointments
- `POST /appointments` - Book an appointment
- `GET /appointments/patient/:patient_id` - Get appointments for a patient
- `GET /appointments/doctor/:doctor_id` - Get appointments for a doctor
- `PUT /appointments/:id` - Update appointment status
- `DELETE /appointments/:id` - Delete an appointment

### Admin
- `POST /admin/register` - Add an admin
- `POST /admin/login` - Admin login
- `GET /admin/appointments` - Get all appointments
- `GET /admin/doctors` - Get all doctors

## Contributing
Contributions are welcome! Feel free to fork this repo and submit a pull request.

## License
This project is licensed under the MIT License.

---

For any issues or support, please contact [your email].

