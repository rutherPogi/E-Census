// src/features/posts/components/PostForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Container, Paper, Button, Typography, IconButton, 
  MenuItem, Select, FormControl, InputLabel, FormHelperText, Divider 
} from "@mui/material";
import { ArrowBack, Clear, AddPhotoAlternate } from "@mui/icons-material";
import { TextInput } from "../../../components/common/FormFields";
import { Notification } from "../../../components/common";

export default function PostForm({
  title,
  initialValues,
  errors,
  setErrors,
  values,
  setValues,
  imagePreviews,
  setImagePreviews,
  handleSubmit,
  notificationState
}) {
  const navigate = useNavigate();
  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    setSnackbarOpen 
  } = notificationState;

  const POST_TYPE_OPTIONS = [
    { value: "news", label: "News and Updates" },
    { value: "services", label: "Services" }
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (!files.length) return;

    // Check if adding these files would exceed the limit
    if (imagePreviews.length + files.length > 5) {
      setErrors(prev => ({ ...prev, images: 'Maximum 5 images allowed' }));
      return;
    }

    // Validate file types
    const invalidFiles = files.filter(file => !file.type.match('image.*'));
    if (invalidFiles.length > 0) {
      setErrors(prev => ({ ...prev, images: 'Please select only image files' }));
      return;
    }
    
    // Create URL for previews
    const newPreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    
    setImagePreviews(prev => [...prev, ...newPreviews]);
    
    // Update values state with the files
    setValues(prev => ({ 
      ...prev, 
      images: [...prev.images, ...files] 
    }));
    setErrors(prev => ({ ...prev, images: '' }));
  };

  const removeImage = (index) => {
    // Create new arrays without the removed image
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    const newImages = [...values.images];
    newImages.splice(index, 1);
    setValues(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const goBack = () => navigate(-1);

  return (
    <Container component={Paper}
      sx={{ borderRadius: 2, backgroundColor: "#fff", p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            onClick={goBack}
            size="medium"
            sx={{ mr: 1 }}
          >
            <ArrowBack/>
          </IconButton>
          <Typography variant="h4">
            {title}
          </Typography>
        </Box>
      </Box>

      <Divider/>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {/* Post Type Dropdown */}
        <FormControl required error={Boolean(errors.postType)}>
          <InputLabel id="post-type-label">Post Type</InputLabel>
          <Select
            labelId="post-type-label"
            id="post-type"
            value={values.postType}
            label="Post Type"
            onChange={handleChange('postType')}
          >
            {POST_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors.postType && <FormHelperText>{errors.postType}</FormHelperText>}
        </FormControl>

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

        {/* Post Description Input */}
        <TextInput
          label="Description"
          value={values.postDescription}
          onChange={handleChange('postDescription')}
          error={Boolean(errors.postDescription)}
          placeholder="Enter Post's Description"
          helperText={errors.postDescription}
          multiline
          rows={4}
          required
        />

        {/* Multiple Image Upload Section */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Images ({imagePreviews.length}/5)
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              mb: 2
            }}
          >
            {/* Current Images */}
            {imagePreviews.map((preview, index) => (
              <Box 
                key={index}
                sx={{
                  position: 'relative',
                  width: 150,
                  height: 150,
                  border: '1px solid #eee',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <img 
                  src={preview.url} 
                  alt={`Preview ${index + 1}`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} 
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                    },
                    p: 0.5
                  }}
                  onClick={() => removeImage(index)}
                >
                  <Clear fontSize="small" />
                </IconButton>
              </Box>
            ))}

            {/* Upload button shown if less than 5 images */}
            {imagePreviews.length < 5 && (
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.02)'
                  }
                }}
                component="label"
                htmlFor="multiple-image-upload"
              >
                <AddPhotoAlternate sx={{ fontSize: 40, color: '#999', mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Add Image
                </Typography>
              </Box>
            )}
          </Box>

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="multiple-image-upload"
            type="file"
            multiple
            onChange={handleImageUpload}
          />
          
          {errors.images && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errors.images}
            </Typography>
          )}
        </Box>

        {/* Submit Button */}
        <Button 
          variant="contained" 
          size="large"
          onClick={handleSubmit}
          sx={{ 
            mt: 2,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark'
            },
            py: 1.5
          }}
        >
          {initialValues ? "Update Post" : "Create Post"}
        </Button>
      </Box>
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />  
    </Container>
  );
}