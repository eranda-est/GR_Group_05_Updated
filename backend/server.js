import express from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './utils/db.js';
import userRoutes from './Routes/UserRoutes.js';
import fpRoutes from './Routes/fpRoutes.js';
import otpRoutes from './Routes/otpRoutes.js';
import cpRoutes from './Routes/cpRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000; // Use the PORT from .env, fallback to 7000 if undefined

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', fpRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/password', cpRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
