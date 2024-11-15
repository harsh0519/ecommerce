import cld from 'cloudinary';
const cloudinary = cld.v2;
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config()

;
// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.FTP_HOST,  // Cloud name from Cloudinary dashboard
  api_key: process.env.FTP_KEY,      // API key from Cloudinary dashboard
  api_secret: process.env.FTP_SECRET, // API secret from Cloudinary dashboard
});

console.log('✅ Cloudinary configuration loaded');

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thecrazynight',
  },
});

console.log('✅ Multer storage configured');

// Initialize multer with Cloudinary storage
const imageUpload = multer({
  onError: function (err, next) {
    console.log('error', err);
    next(err);
  },
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
  fileFilter: (req, file, cb) => {
    console.log(`ℹ️ Checking file type for file: ${file.originalname}`);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      console.log('✅ File type is allowed');
      cb(null, true); // Accept file
    } else {
      console.error('❌ Invalid file type. Only images are allowed.');
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  },

});

console.log('✅ Multer initialized with Cloudinary storage');

export default {
  imageUpload,
};
