// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = express.Router();

// FTP upload route
router.post('/uploadToFTP', async (req, res) => {
    const { filePath, destinationPath } = req.body;


    try {

        // Upload the file from the local server
        await client.uploadFrom(filePath, destinationPath);

        console.log('File uploaded successfully');
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (err) {
        console.error('FTP upload failed:', err);
        res.status(500).json({ error: 'FTP upload failed', details: err.message });
    } finally {
        client.close();
    }
});

// Start the server
const PORT =     process.env.PORT || 5000;
router.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
