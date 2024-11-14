const express = require('express');
const cors = require('cors');
const { Client } = require('basic-ftp'); // Import FTP client library
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies
const PORT = process.env.PORT || 5000;

// FTP upload route
app.post('/uploadToFTP', async (req, res) => {
    const { filePath, destinationPath } = req.body;

    const client = new Client(); // Initialize the FTP client instance
    client.ftp.verbose = true;    // Enable verbose logging

    try {
        // Connect to the FTP server
        await client.access({
            host: "ftp.thecrazynyt.com",
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false, // Set to true if using FTPS
        });

        // Upload the file from the local server
        await client.uploadFrom(filePath, destinationPath);

        console.log('File uploaded successfully');
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (err) {
        console.error('FTP upload failed:', err);
        res.status(500).json({ error: 'FTP upload failed', details: err.message });
    } finally {
        // Ensure the client is closed to free up resources
        client.close();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
