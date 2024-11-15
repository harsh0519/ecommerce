import cld from 'cloudinary';
const cloudinary = cld.v2;
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config({
    path: "../../.env"
});

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.FTP_HOST,  // Cloud name from Cloudinary dashboard
    api_key: process.env.FTP_KEY,      // API key from Cloudinary dashboard
    api_secret: process.env.FTP_SECRET, // API secret from Cloudinary dashboard
});

console.log('✅ Cloudinary configuration loaded successfully.');

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'thecrazynight', // Optional: Organize uploads into a specific folder
    },
});

console.log('✅ Multer storage configured with Cloudinary settings.');

// Initialize multer with Cloudinary storage
const imageUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
    fileFilter: (req, file, cb) => {
        console.log('ℹ️ Validating file type...');
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (allowedTypes.includes(file.mimetype)) {
            console.log(`✅ File type "${file.mimetype}" is allowed.`);
            cb(null, true);  // Accept file
        } else {
            console.error(`❌ Invalid file type "${file.mimetype}". Only JPEG, PNG, and GIF are allowed.`);
            cb(new Error('Invalid file type. Only images are allowed.'));
        }
    },
});

console.log('✅ Multer initialized with Cloudinary storage and configurations.');

export default {
    imageUpload,
};
