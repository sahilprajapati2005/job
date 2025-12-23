import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

import router from './routes/user.route.js';
import routerCompany from './routes/company.route.js';
import routerjob from './routes/job.route.js';
import routerApplication from './routes/application.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://career-portal-s.netlify.app',
        'https://job-smoky-seven.vercel.app',
        'https://job-portal-backend-gamma-sepia.vercel.app'
    ],
    credentials: true
};
app.use(cors(corsOptions));

// --- FIX: Database Connection Middleware ---
// This guarantees DB is connected BEFORE any route handler runs
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection error in middleware:", error);
        res.status(500).json({ 
            message: "Database connection failed", 
            success: false,
            error: error.message 
        });
    }
});
// -------------------------------------------

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Backend is running successfully!",
        success: true
    });
});

// API routes
app.use('/api/v1/user', router);
app.use('/api/v1/company', routerCompany);
app.use('/api/v1/job', routerjob);
app.use('/api/v1/application', routerApplication);

// Local Development Server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
// Note: We removed the "else { connectDB() }" block because 
// the middleware above now handles it for both Production and Dev.

export default app;