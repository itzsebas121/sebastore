import multer from 'multer';
import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

// Setup multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Middleware wrapper for multer
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      return result instanceof Error ? reject(result) : resolve(result);
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // O reemplaza * con tu dominio exacto
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // CORS preflight
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    await runMiddleware(req, res, upload.single('file'));

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          public_id: uuidv4(),
          folder: 'productos',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      req.file && stream.end(req.file.buffer);
    });

    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al subir la imagen' });
  }
}
