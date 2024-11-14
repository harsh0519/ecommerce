import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import indexRoutes from '../src/routes/indexRoutes.js';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const allowedOrigin = isProduction ? process.env.BASE_CLIENT_URL : 'http://localhost:5173';

// Initialize Express
const app = express();

// CORS Middleware with Detailed Logging
app.use(cors({
 origin: ["http://localhost:3000","https://www.thecrazynyt.com","https://crazy-nyt-client-harsh0519s-projects.vercel.app"]  
}));

// Middleware for parsing URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route handling
app.use(indexRoutes);

// Serve static files
app.use(express.static(join(__dirname, '..', 'public')));

// Health check route
app.get('/', (req, res) => {
    res.sendStatus(200);
});

// Start the server with enhanced logging
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
    console.log(`CORS configured for ${allowedOrigin}`);
});
