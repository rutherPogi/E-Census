import express from 'express';
import * as postController from '../controllers/postController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadToMemory, processImageForDatabase } from '../middlewares/multer.js';

const router = express.Router();


router.get('/getPosts', postController.getAllPosts);
router.get('/posts/:id', authenticateToken, postController.getPostById);


router.post('/addPost', 
  authenticateToken,
  uploadToMemory.single('image'),  // Use memory storage for database
  processImageForDatabase,        // Process image for database storage
  postController.createPost
);

router.put('/posts/:id',
  authenticateToken,
  uploadToMemory.single('image'),  // Allow updating the image
  processImageForDatabase,
  postController.updatePost
);


router.delete('/posts/:id', authenticateToken, postController.deletePost);



export default router; 