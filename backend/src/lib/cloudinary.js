import {v2 as cloudinary} from "cloudinary"
import {config} from 'dotenv';
config();

cloudinary.config({
  cloud_name: process.env.CLODANTY_NAME,
  api_key: process.env.CLODANTY_API_KEY, 
  api_secret: process.env.CLODANTY_API_SECRET
});
export  default cloudinary