import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadImage = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'listings', // Optional: specify a folder in Cloudinary
        use_filename: true, // Optional: keeps the original file name
      });
      return result.secure_url; // This is the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };

export default uploadImage;

