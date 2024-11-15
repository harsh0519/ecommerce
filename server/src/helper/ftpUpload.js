import cloudinary from 'cloudinary';
const { v2: cloudinaryV2 } = cloudinary;
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

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
    folder: 'uploads',  // Optional: specify a folder on Cloudinary (you can customize it)
    public_id: (req, file) => {
      const publicId = file.originalname.split('.')[0];  // Generate public ID based on file name
      console.log(`ℹ️ Generated public ID for file: ${publicId}`);
      return publicId;
    },
    format: async (req, file) => {
      console.log('ℹ️ Setting file format to "jpg".');
      return 'jpg';  // Optional: set default format
    },
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
