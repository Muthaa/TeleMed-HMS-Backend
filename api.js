// Import required modules
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
const app = express();
const PORT = process.env.PORT || 3000;

// Security Headers
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
  }
  next();
};

// Import Routes
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

// Swagger Documentation
swaggerDocs(app);

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
