// File: src/components/EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        const post = response.data;
        
        setFormData({
          title: post.title,
          description: post.description
        });
        
        setPreview(`http://localhost:5000/uploads/${post.image}`);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post data');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }
    
    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('description', formData.description);
    
    if (image) {
      postData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
    }
  };

  if (loading) {
    return <Typography>Loading post data...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          component={Link} 
          to={`/post/${id}`}
          startIcon={<ArrowBackIcon />}
        >
          Back to Post
        </Button>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Post
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <Button
              variant="contained"
              component="label"
            >
              Change Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            
            {preview && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Image Preview:
                </Typography>
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '300px',
                    objectFit: 'cover'
                  }} 
                />
              </Box>
            )}
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            size="large"
          >
            Update Post
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditPost;