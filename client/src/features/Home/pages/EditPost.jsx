import { useState } from "react";
import { Box, Container, Button, Paper, Dialog, DialogActions,
         DialogContent, DialogTitle, 
         Typography} from "@mui/material";
import { Edit, Add, Image } from "@mui/icons-material";

import PostLists from "./PostLists";
import { post } from "../../../utils/api/apiService";
import { TextInput } from "../../../components/common/FormFields";
import { Notification } from '../../../components/common/Notification';
import { useAuth } from '../../../utils/auth/authContext'
import { INITIAL_STATE_ERRORS, INITIAL_STATE_VALUES } from "../utils/constants";

export default function EditPost() {

  const { userData } = useAuth();

  const [values, setValues] = useState(INITIAL_STATE_VALUES);
  const [errors, setErrors] = useState(INITIAL_STATE_ERRORS);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); resetForm(); };

  // Reset form function
  const resetForm = () => {
    setValues({ postTitle: '', postDescription: '', image: null });
    setImagePreview('');
    setErrors({ postTitle: '', postDescription: '', image: '' });
  };

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  const validateForm = () => {
    const newErrors = {
      postTitle: '',
      postDescription: '',
      image: ''
    };
    let isValid = true;

    // Check if title is empty
    if (!values.postTitle.trim()) {
      newErrors.postTitle = 'Post title is required';
      isValid = false;
    }

    // Check if description is empty
    if (!values.postDescription.trim()) {
      newErrors.postDescription = 'Post description is required';
      isValid = false;
    }

    // Check if image is selected
    if (!values.image) {
      newErrors.image = 'Please upload an image';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, image: 'Please select an image file' }));
      return;
    }
    
    // Create URL for preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    // Update values state with the file
    setValues(prev => ({ ...prev, image: file }));
    setErrors(prev => ({ ...prev, image: '' }));
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handlePost = async () => {

    if (!validateForm()) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append('postTitle', values.postTitle);
      formData.append('postDescription', values.postDescription);
      formData.append('image', values.image);
      formData.append('userID', userData.userID);

      console.log("Sending form data:", Object.fromEntries(formData));

      const response = await post('/posts/addPost', formData, true);
      console.log("Post created:", response);

      handleClose();
      showNotification('Post created successfully!', 'success');
      
    } catch (error) {
      console.error("Error creating post:", error);
      showNotification('Error creating post. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      component={Paper}
      sx={{ borderRadius: 2, backgroundColor: "#fff", p: 5, display: 'flex', flexDirection: 'column', gap: 5 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', borderLeft: '10px solid #0288d1'}}>
          <Typography variant='h4'  ml={2}>News and Announcements</Typography>
        </Box>
        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button variant="outlined" startIcon={<Edit />}>EDIT POST</Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
            ADD POST
          </Button>
        </Box>
      </Box>

      {/* Post list component */}
      <PostLists />

      {/* Add Post Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add a New Post +</DialogTitle>
        <DialogContent>
          <Box display={'flex'} flexDirection={'column'} mt={2} gap={2}>
            {/* Image Upload Section */}
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px dashed #ccc',
                borderRadius: 1,
                p: 2
              }}
            >
              {imagePreview ? (
                <Box sx={{ mb: 2 }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ maxWidth: '100%', maxHeight: '200px' }} 
                  />
                </Box>
              ) : (
                <Image sx={{ fontSize: 60, color: '#ccc', mb: 1 }} />
              )}
              
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button 
                  variant="outlined" 
                  component="span" 
                  startIcon={<Image />}
                >
                  {imagePreview ? 'Change Image' : 'Upload Image'}
                </Button>
              </label>
              
              {errors.image && (
                <Box sx={{ color: 'error.main', mt: 1 }}>{errors.image}</Box>
              )}
            </Box>

            {/* Post Title Input */}
            <TextInput
              label="Title"
              value={values.postTitle}
              onChange={handleChange('postTitle')}
              error={Boolean(errors.postTitle)}
              placeholder="Enter Post's Title"
              helperText={errors.postTitle}
              required
            />

            {/* Post Description Input - Fixed field name */}
            <TextInput
              label="Description"
              value={values.postDescription}
              onChange={handleChange('postDescription')}
              error={Boolean(errors.postDescription)}
              placeholder="Enter Post's Description"
              helperText={errors.postDescription}
              multiline
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handlePost} 
            variant="contained" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification component */}
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </Container>
  );
}