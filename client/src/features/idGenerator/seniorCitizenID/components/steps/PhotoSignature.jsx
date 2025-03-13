import { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Grid, IconButton, Container } from '@mui/material';
import { CloudUpload, Delete} from '@mui/icons-material';

import { useFormContext } from "../../components/others/FormContext";
import { Notification } from "../../../components/Notification";

export default function PhotoSignature({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  
  const [images, setImages] = useState({
    photoID: null,
    signature: null
  });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if (formData.photoSignature) {
      if (formData.photoSignature.photoID) {
        setImages(prev => ({ ...prev, photoID: formData.photoSignature.photoID }));
      }
      if (formData.photoSignature.signature) {
        setImages(prev => ({ ...prev, signature: formData.photoSignature.signature }));
      }
    }
  }, [formData.photoSignature]);

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  const handleImageUpload = (type) => (event) => {
    const file = event.target.files[0];
    
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showNotification(`Image must be less than 2MB`, 'error');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        showNotification(`Please upload a valid image file`, 'error');
        return;
      }
      
      // Update state with new image
      setImages(prev => ({
        ...prev,
        [type]: {
          file: file,           
          preview: URL.createObjectURL(file),
          fileName: file.name
        }
      }));
    }
  };

  const handleClearImage = (type) => {
    setImages(prev => ({ ...prev, [type]: null }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!images.photoID || !images.signature) {
      showNotification("Please upload an image first", 'error')
      return;
    }
  
    // Create FormData object for file upload
    const formData = new FormData();
    
    // Append the actual files
    if (images.photoID.file) {
      formData.append('photoID', images.photoID.file);
    }
    
    if (images.signature.file) {
      formData.append('signature', images.signature.file);
    }
  
    try {
      // Send the files to your API endpoint
      const response = await fetch('/api/upload', {  // Replace with your actual endpoint
        method: 'POST',
        body: formData,
        // Don't set Content-Type header for FormData
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const result = await response.json();
      
      // Update form data with the base64 data from the server response
      updateFormData('photoSignature', { 
        photoID: {
          base64: result.photoID.base64,
          fileName: images.photoID.fileName
        },
        signature: {
          base64: result.signature.base64,
          fileName: images.signature.fileName
        }
      });
      
      console.log("Photo ID and Signature uploaded");
      handleNext();
    } catch (error) {
      console.error('Error uploading files:', error);
      showNotification("Error uploading files: " + error.message, 'error');
    }
  };
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>PHOTO and SIGNATURE </div>
        <Box sx = {{ display: 'flex', gap: '1em', padding: '1em'}}>
          {/* Photo ID Upload Section */}
          <Box sx = {{ flex: 1 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Photo ID</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Upload a clear photo ID. Face should be clearly visible.
              </Typography>
              
              {/* Upload Area */}
              <Paper 
                elevation={1}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: images.photoID?.preview ? 'transparent' : '#f8f8f8',
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
                onClick={() => document.getElementById('photoID-input').click()}
              >
                {images.photoID?.preview ? (
                  <Box 
                    component="img"
                    src={images.photoID.preview}
                    alt="Photo ID preview"
                    sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <>
                    <CloudUpload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body1">Click to upload Photo ID</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Supports: JPG, PNG (Max: 2MB)
                    </Typography>
                  </>
                )}
                
                <input
                  id="photoID-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload('photoID')}
                  style={{ display: 'none' }}
                />
              </Paper>
              
              {/* File name and delete button */}
              {images.photoID && (
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" noWrap sx={{ maxWidth: '70%' }}>
                    {images.photoID.fileName}
                  </Typography>
                  <IconButton color="error" onClick={() => handleClearImage('photoID')} size="small">
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>

          {/* Signature Upload Section */}
          <Box sx = {{ flex: 1 }} >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Signature</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Upload a clear image of your signature on white background.
              </Typography>
              
              {/* Upload Area */}
              <Paper 
                elevation={1}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: images.signature?.preview ? 'transparent' : '#f8f8f8',
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
                onClick={() => document.getElementById('signature-input').click()}
              >
                {images.signature?.preview ? (
                  <Box 
                    component="img"
                    src={images.signature.preview}
                    alt="Signature preview"
                    sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <>
                    <CloudUpload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body1">Click to upload Signature</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Supports: JPG, PNG (Max: 2MB)
                    </Typography>
                  </>
                )}
                
                <input
                  id="signature-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload('signature')}
                  style={{ display: 'none' }}
                />
              </Paper>
              
              {/* File name and delete button */}
              {images.signature && (
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" noWrap sx={{ maxWidth: '70%' }}>
                    {images.signature.fileName}
                  </Typography>
                  <IconButton color="error" onClick={() => handleClearImage('signature')} size="small">
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
        </div> 
      </div>
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  );
}