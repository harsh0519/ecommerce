import cld from 'cloudinary';
const cloudinary = cld.v2;
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config({
    path: "../../.env"
});

// Configure Cloudinary with credentials
cloudinary.config({
    cloud_name: process.env.FTP_HOST,  // Cloudinary Cloud Name
    api_key: process.env.FTP_KEY,     // Cloudinary API Key
    api_secret: process.env.FTP_SECRET, // Cloudinary API Secret
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'thecrazynight', // Specify the folder name in Cloudinary
        allowed_formats: ['jpeg', 'png', 'gif'], // Allowed file formats
    },
});

// Initialize Multer with Cloudinary storage
const imageUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set max file size to 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accept file
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.')); // Reject file
        }
    },
});

export default {
    imageUpload,
};
