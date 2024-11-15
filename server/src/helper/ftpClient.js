import cloudinary from 'cloudinary';
const { v2: cloudinaryV2 } = cloudinary;
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.FTP_HOST,
  api_key: process.env.FTP_KEY,
  api_secret: process.env.FTP_SECRET,
});

console.log('✅ Cloudinary configuration loaded successfully.');

async function cloudinaryUpload(filePath) {
  if (!filePath) {
    console.error('❌ Error: No file path provided for upload.');
    return;
  }

  console.log(`ℹ️ Starting upload for file at path: ${filePath}`);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads', // Optional: Organize uploads into a specific folder
      use_filename: true, // Use original filename in Cloudinary
      unique_filename: false, // Prevent Cloudinary from generating a unique name
    });

    console.log('✅ File uploaded successfully to Cloudinary.');
    console.log('ℹ️ Cloudinary response:', result);

    return result; // Return the result for further use
  } catch (err) {
    console.error('❌ Error uploading to Cloudinary:', err.message);
    console.error('ℹ️ Full error details:', err);
  }
}

// Example usage
cloudinaryUpload(); // Replace with your file path
