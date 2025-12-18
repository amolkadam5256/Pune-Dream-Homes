const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* =======================
   Middleware
======================= */

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   Routes
======================= */

// Root
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Auth API Server',
        version: '1.0.0'
    });
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

// Test route
app.get('/test', (req, res) => {
    res.json({ success: true, message: 'Server is working' });
});

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

/* =======================
   404 Handler
======================= */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

/* =======================
   Global Error Handler
======================= */

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

const { sequelize } = require('./models');

/* =======================
   Start Server
======================= */

const PORT = process.env.PORT || 5000;

// Sync database and start server
const startServer = async () => {
    try {
        // Sync models to database
        // Use { force: true } only in development if you want to drop and recreate tables
        // await sequelize.sync({ force: false });
        await sequelize.sync();
        console.log('✅ Database synced');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
};

startServer();
