# TeleMed-HMS Backend
## Healthcare Management System

## Overview
The **TeleMed-HMS Backend** is a **Node.js & MySQL-based API** for managing healthcare services, including patients, doctors, and appointments. It uses **session-based authentication** stored in MySQL for secure user sessions.

## Features
- **Patient Management**: Registration, login, profile updates, and account deletion.
- **Doctor Management**: Adding doctors, updating profiles, and retrieving doctor details.
- **Appointment Management**: Booking, updating status, and deleting appointments.
- **Admin Controls**: Managing users, viewing appointments, and logging in securely.
- **Authentication & Authorization**: Secure JWT-based authentication.
- **Swagger Documentation**: API documentation with Swagger.
- **User Roles:** Patients, Doctors, and Admins
- **Session-based Authentication:** Stored in MySQL
- **Security:** Helmet.js, rate limiting, CORS policies
- **API Documentation:** Swagger integrated
- **Role-Based Access Control (RBAC)** for fine-grained permissions

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
=======
- **Authentication**: Express-session with MySQL storage
- **Documentation**: Swagger
- **Hosting**: cPanel-supported Node.js deployment
- **Security:** Helmet.js, CORS, bcrypt for password hashing
- **Logging:** Winston for server logs
---

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/telemed-hms-backend.git
cd telemed-hms-backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=3000
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASS=your-mysql-password
DB_NAME=your-database-name
SESSION_SECRET=your-secret-key
FRONTEND_URL_1=http://localhost:5173
FRONTEND_URL_2=https://your-production-url.com
```

### 4. Set up the database:
   - Import the SQL schema from `db_schema.sql`.

### 5. Start the Server
```sh
npm start
```
> The API will be available at `http://localhost:3000`

---

## API Endpoints

>>>>>>> 98121c5 (update backend security features)
Swagger documentation is available at:
```
http://localhost:3000/api-docs
```
<<<<<<< HEAD

## API Endpoints
=======
>>>>>>> 98121c5 (update backend security features)
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

<<<<<<< HEAD
## Contributing
Contributions are welcome! Feel free to fork this repo and submit a pull request.

## License
This project is licensed under the MIT License.

---

For any issues or support, please contact [your email].
=======

## Frontend Integration
### **Using Sessions in React**

1. **Include Credentials in Requests**:
```js
fetch('http://localhost:3000/auth/me', {
  method: 'GET',
  credentials: 'include', // Important for session cookies
})
```

2. **Handle Authentication State**:
```js
const [user, setUser] = useState(null);

useEffect(() => {
  fetch('http://localhost:3000/auth/me', {
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(() => setUser(null));
}, []);
```

3. **Ensure CORS Allows Cookies** (Backend `server.js`):
```js
app.use(cors({
  origin: [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2],
  credentials: true,
}));
```

---

## Troubleshooting
| Issue | Possible Cause | Solution |
|--------|--------------|---------|
| **Session resets on refresh** | Cookies not being sent | Ensure `credentials: 'include'` in fetch calls |
| **CORS errors** | Incorrect frontend URL | Verify `.env` has correct `FRONTEND_URL_*` |
| **Database errors** | Connection issues | Check `.env` DB credentials |
| **Login redirects back to login page** | Session not persisting | Ensure MySQL session storage is properly configured |

---

## Suggested Feature Upgrades
- **Two-Factor Authentication (2FA)** for enhanced security
- **WebSockets for Real-Time Updates** on appointments
- **Automated Appointment Reminders** via email/SMS
- **Multi-Language Support** for diverse user base
- **Telemedicine Video Call Integration** with WebRTC

---

## License
This project is **MIT Licensed**. Feel free to use and modify!

---
>>>>>>> 98121c5 (update backend security features)

