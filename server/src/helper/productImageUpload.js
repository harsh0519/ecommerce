import cld from 'cloudinary';
const cloudinary = cld.v2;
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.FTP_HOST,
  api_key: process.env.FTP_KEY,
  api_secret: process.env.FTP_SECRET,
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: thecrazynight/$`{req.user?.id || 'default'}`,
  }),
});

// Initialize multer middleware
const imageUpload = multer({
  onError: (err, next) => {
    console.error('Upload Error:', err);  // Log the error for debugging
    next(err);  // Continue to the next middleware with the error
  },
  storage,  // Use CloudinaryStorage as storage for multer
  limits: { fileSize: 5 * 1024 * 1024 },  // Max file size is 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Allowed file types
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);  // Accept the file
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  },
}).array('imagefile', 10);  // Allows up to 10 images

// Exporting the imageUpload middleware
export default { imageUpload };
