import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage for temporary file uploads (before converting to base64)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create the multer middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware that processes the uploaded file and converts to base64
const processPhotoID = (req, res, next) => {
  // If no file was uploaded, continue to next middleware
  if (!req.file) {
    return next();
  }

  try {
    // Read the file from disk
    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath);
    
    // Convert to base64
    const base64Data = fileData.toString('base64');
    const mimeType = req.file.mimetype;
    const base64Image = `data:${mimeType};base64,${base64Data}`;
    
    // Add the base64 data to the request body
    req.body.photoID = { 
      image: {
        base64: base64Image,
        fileName: req.file.originalname
      }
    };
    
    // Remove temporary file
    fs.unlinkSync(filePath);
    
    next();
  } catch (error) {
    next(error);
  }
};

const processPhotoSignature = (req, res, next) => {
  // If no files were uploaded, continue to next middleware
  if (!req.files) {
    return next();
  }

  try {
    // Initialize photoSignature object if it doesn't exist
    req.body.photoSignature = req.body.photoSignature || {};
    
    // Process photoID if it exists
    if (req.files.photoID) {
      const photoIDFile = req.files.photoID[0];
      const photoIDPath = photoIDFile.path;
      const photoIDData = fs.readFileSync(photoIDPath);
      
      // Convert to base64
      const photoIDBase64 = photoIDData.toString('base64');
      const photoIDMimeType = photoIDFile.mimetype;
      const photoIDBase64Image = `data:${photoIDMimeType};base64,${photoIDBase64}`;
      
      // Add the base64 data to the request body
      req.body.photoSignature.photoID = { 
        base64: photoIDBase64Image,
        fileName: photoIDFile.originalname
      };
      
      // Remove temporary file
      fs.unlinkSync(photoIDPath);
    }
    
    // Process signature if it exists
    if (req.files.signature) {
      const signatureFile = req.files.signature[0];
      const signaturePath = signatureFile.path;
      const signatureData = fs.readFileSync(signaturePath);
      
      // Convert to base64
      const signatureBase64 = signatureData.toString('base64');
      const signatureMimeType = signatureFile.mimetype;
      const signatureBase64Image = `data:${signatureMimeType};base64,${signatureBase64}`;
      
      // Add the base64 data to the request body
      req.body.photoSignature.signature = { 
        base64: signatureBase64Image,
        fileName: signatureFile.originalname
      };
      
      // Remove temporary file
      fs.unlinkSync(signaturePath);
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

// Handle base64 image data directly from client
const handleBase64Image = (req, res, next) => {
  // If the request already has base64 image data (from React frontend)
  if (req.body.photoID && req.body.photoID.image && req.body.photoID.image.base64) {
    // Already in the right format, no need to modify
    next();
  } else {
    next();
  }
};

export { upload, processPhotoID, processPhotoSignature, handleBase64Image };