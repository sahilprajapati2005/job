import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import router from './routes/user.route.js';
import routerCompany from './routes/company.route.js';
import routerjob from './routes/job.route.js';
import routerApplication from './routes/application.route.js';

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🟢 UPDATE THIS SECTION 🟢
const corsOptions = {
    origin: [
        'http://localhost:5173',                  // Allows your local computer
        'https://jazzy-begonia-b5bb52.netlify.app'
    ],
    credentials: true,
}
app.use(cors(corsOptions));
// -------------------------

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Backend is running successfully!",
        success: true
    });
});

const PORT = process.env.PORT || 3000;

app.use('/api/v1/user', router);
app.use('/api/v1/company', routerCompany);
app.use('/api/v1/job', routerjob);
app.use('/api/v1/application', routerApplication);

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
})