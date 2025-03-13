// Import required modules
<<<<<<< HEAD
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const bodyParser = require('body-parser');
const swaggerDocs = require('./swaggerConfig');

dotenv.config();
=======
const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const winston = require("winston");
const bodyParser = require("body-parser");
const MySQLStore = require("express-mysql-session")(session);
const swaggerDocs = require('./swaggerConfig');

// Load environment variables
dotenv.config();

>>>>>>> 98121c5 (update backend security features)
const app = express();
const PORT = process.env.PORT || 3000;

// Security Headers
<<<<<<< HEAD
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);
=======
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// // Rate limiting to prevent abuse
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { error: "Too many requests, please try again later." },
// });
// app.use(limiter);
>>>>>>> 98121c5 (update backend security features)

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use(cors({ 
  origin: process.env.FRONTEND_URL, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());

// Logger setup (Winston)
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'server.log', fsync: true }) // 🔥 Forces immediate file write
    ]
  });
  
  // Ensure logs are flushed when the process exits
  process.on('exit', () => {
    logger.end();
  });

  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} - ${req.ip}`);
    next();
  }); 

=======
app.use(bodyParser.json());

>>>>>>> 98121c5 (update backend security features)
// Database Connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test Database Connection
<<<<<<< HEAD
db.getConnection((err, connection) => {
  if (err) {
    logger.error(`❌ Database connection failed: ${err.message}`);
  } else {
    logger.info('✅ Database connected successfully');
    connection.release();
  }
});


// Authentication Middleware
const authenticate = (req, res, next) => {
  if (!req.session.patientId && !req.session.adminId) {
    return res.status(401).json({ error: 'Unauthorized access' });
=======
db.getConnection()
  .then((connection) => {
    console.log("✅ Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    console.error(`❌ Database connection failed: ${err.message}`);
  });

// Initialize MySQL session store
const sessionStore = new MySQLStore(
  {
    expiration: 86400000, // 24 hours
    clearExpired: true,
    checkExpirationInterval: 1800000, // Clean expired sessions every 30 minutes
  },
  db
);

// CORS Configuration
const allowedOrigins = [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Configure Sessions
app.use(
  session({
    key: "connect.sid",
    secret: process.env.SESSION_SECRET || "supersecret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // ✅ Change to `true` in production (requires HTTPS)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ Required for cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, // 24 hours session expiration
    },
  })
);

// Logger setup (Winston)
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "server.log", fsync: true }), // ✅ Forces immediate file write
  ],
});

// Ensure logs are flushed when the process exits
process.on("exit", () => {
  logger.end();
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`);
  next();
});

// Authentication Middleware
const authenticate = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized access" });
>>>>>>> 98121c5 (update backend security features)
  }
  next();
};

// Import Routes
<<<<<<< HEAD
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use Routes
app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/admin', adminRoutes);
=======
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Use Routes
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/admin", adminRoutes);
>>>>>>> 98121c5 (update backend security features)

// Swagger Documentation
swaggerDocs(app);

<<<<<<< HEAD
app.get('/', (req, res) => {
  res.json({ message: '🚀 TeleMedicine API is running!' });
  //res.redirect('/api-docs');
});

// Start Server
const server = app.listen(PORT,() => {
  logger.info(`Server running on http://localhost:${PORT}`);
  console.log(`Server running on port ${PORT}`)
});

module.exports = { app, server }; // Export both app and server
=======
// Test API
app.get("/", (req, res) => {
  res.json({ message: "🚀 TeleMedicine API is running!" });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = { app, server };
>>>>>>> 98121c5 (update backend security features)
