import express from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './utils/db.js';
import fpRoutes from './Routes/fpRoutes.js';
import otpRoutes from './Routes/otpRoutes.js';
import cpRoutes from './Routes/cpRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', fpRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/password', cpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
