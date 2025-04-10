import { Box, Button, TextField, IconButton, Typography, Grid, FormControl, FormLabel } from '@mui/material';
import { Delete, Add } from "@mui/icons-material";




export default function HouseImages({ images, setValues, errors, showNotification }) {

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      showNotification('Please select an image file', 'error');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image size should be less than 5MB', 'error');
      return;
    }
    
    // Create URL for preview
    const previewUrl = URL.createObjectURL(file);
    
    // Add new image with empty title to the images array
    const newImage = {
      file: file,
      preview: previewUrl,
      title: ""  
    };
    
    setValues(prev => ({ ...prev, houseImages: [...prev.houseImages, newImage] }));
    
    showNotification('Image added successfully', 'success');
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    
    setValues(prev => ({ ...prev, houseImages: updatedImages }));
    
    showNotification('Image removed', 'info');
  };

  const handleTitleChange = (index) => (e) => {
    const newTitle = e.target.value;
    const updatedImages = [...images];
    updatedImages[index] = { ...updatedImages[index], title: newTitle };
    
    setValues(prev => ({ ...prev, houseImages: updatedImages }));
  };

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel component="legend">House Images</FormLabel>

      {/* Upload New Image */}
      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 2, mt: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="house-image-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="house-image-upload">
          <Button 
            variant="outlined" 
            component="span" 
            startIcon={<Add />}
          >
            Add Image
          </Button>
        </label>
      </Box>

      {/* Images Grid */}
      {images.length > 0 ? (
        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box 
                sx={{ 
                  border: '1px solid #eee',
                  borderRadius: 1,
                  padding: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <img 
                    src={image.preview} 
                    alt={`House Image ${index + 1}`}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
                  />
                </Box>
                <TextField
                  label='Title'
                  value={image.title || ""}
                  onChange={handleTitleChange(index)}
                  error={!!errors.title}
                  helperText={errors.title}
                  fullWidth
                  margin="normal"
                  required
                  size="small"
                />
                <IconButton 
                  color="error" 
                  onClick={() => handleRemoveImage(index)}
                  sx={{ alignSelf: 'flex-end' }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', mt: 2 }}>
          No images uploaded yet. Please add at least one house image.
        </Typography>
      )}
    </FormControl>
  );
}