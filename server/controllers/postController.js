import pool from '../config/database.js';
// import * as postModel from '../models/postModel.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM Posts ORDER BY postDate ASC`);
    
    const processedRows = rows.map(row => {
      let processedRow = {...row};

      if (row.postImage) {
        // Add proper image data URL prefix
        processedRow.postImage = `data:image/jpeg;base64,${Buffer.from(row.postImage).toString('base64')}`;
      }
      
      return processedRow;
    });

    res.json(processedRows);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific post
export const getPostById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Posts WHERE postID = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const post = rows[0];
    
    // Convert image data to base64 for response
    if (post.image_data) {
      post.image_data = `data:${post.image_type};base64,${post.image_data.toString('base64')}`;
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Create a new post
export const createPost = async (req, res) => {
  try {
    const { userID, postTitle, postDescription } = req.body;
    console.log(req.body);
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    
    // Insert post with image
    const [result] = await pool.query(
      `INSERT INTO Posts 
       (userID, postTitle, postDescription, postImage, postDate) 
       VALUES (?, ?, ?, ?, CURDATE())`,
      [
        userID,
        postTitle,
        postDescription,
        req.file.buffer
      ]
    );
    
    res.status(201).json({ 
      message: 'Post created successfully',
      postId: result.insertId
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { postTitle, postDescription } = req.body;
    const postId = req.params.id;
    const userId = req.user.id; // From auth middleware
    
    // Check if post exists and belongs to user
    const [existingPosts] = await pool.query(
      'SELECT * FROM posts WHERE id = ? AND user_id = ?',
      [postId, userId]
    );
    
    if (existingPosts.length === 0) {
      return res.status(404).json({ message: 'Post not found or not authorized' });
    }
    
    // Update post data
    if (req.file) {
      // If new image was uploaded, update everything including image
      await pool.query(
        `UPDATE Posts 
         SET postTitle = ?, postDescription = ?, postImage = ? 
         WHERE postID = ? AND userID = ?`,
        [
          postTitle,
          postDescription,
          req.file.buffer,
          postId,
          userId
        ]
      );
    } else {
      // If no new image, update only text fields
      await pool.query(
        `UPDATE posts 
         SET postTitle = ?, postDescription = ? 
         WHERE postID = ? AND userID = ?`,
        [
          postTitle,
          postDescription,
          postId,
          userId
        ]
      );
    }
    
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id; // From auth middleware
    
    // Delete post if it belongs to the user
    const [result] = await pool.query(
      'DELETE FROM Posts WHERE postID = ? AND userID = ?',
      [postId, userId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found or not authorized' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

