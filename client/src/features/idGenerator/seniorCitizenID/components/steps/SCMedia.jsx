import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, FormHelperText } from '@mui/material';
import { Image } from "@mui/icons-material";

import { useFormContext } from "../others/FormContext";
import { Notification } from "../../../components/Notification";

export default function SCMedia({ handleBack, handleNext }) {
  
  const { formData, updateFormData } = useFormContext();
  
  const [values, setValues] = useState({ photoID: null, signature: null });
  const [errors, setErrors] = useState({ photoID: false, signature: false });
  const [imagePreviews, setImagePreviews] = useState({ photoID: '', signature: '' });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    // Load existing data if available
    if (formData.scMedia) {
      if (formData.scMedia.photoID) {
        setValues(prev => ({ ...prev, photoID: formData.scMedia.photoID }));
        if (formData.scMedia.photoID instanceof File) {
          setImagePreviews(prev => ({ 
            ...prev, photoID: URL.createObjectURL(formData.scMedia.photoID) 
          }));
        }
      }
      
      if (formData.scMedia.signature) {
        setValues(prev => ({ ...prev, signature: formData.scMedia.signature }));
        if (formData.scMedia.signature instanceof File) {
          setImagePreviews(prev => ({ 
            ...prev, signature: URL.createObjectURL(formData.scMedia.signature) 
          }));
        }
      }
    }
  }, [formData.scMedia]);

  // Show notification
  const showNotification = (message, severity) => {
    setSnackbarMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  // Handle image upload
  const handleImageUpload = (type) => (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, [type]: true }));
      showNotification(`Please select an image file for ${type}`, 'error');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [type]: true }));
      showNotification(`Image size should be less than 5MB for ${type}`, 'error');
      return;
    }
    
    // Create URL for preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreviews(prev => ({ ...prev, [type]: previewUrl }));
    
    // Update values state with the file
    setValues(prev => ({ ...prev, [type]: file }));
    setErrors(prev => ({ ...prev, [type]: false }));
    showNotification(`${type} image uploaded successfully`, 'success');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if both images are uploaded
    if (!values.photoID || !values.signature) {
      setSnackbarMessage("Please upload both Photo ID and Signature");
      setSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Update form context with both images
    updateFormData('scMedia', { 
      photoID: values.photoID,
      signature: values.signature,
      photoIDPreview: imagePreviews.photoID,
      signaturePreview: imagePreviews.signature
    });
    
    console.log("Photo ID and Signature uploaded!");
    handleNext();
  };

  return (
    <div className='responsive-container'>
      <div className='responsive-header'>Photo ID and Signature</div>
      <div className='responsive-details'>
        {/* Photo ID Upload */}
        <FormControl fullWidth margin="normal">
          <FormLabel component="legend">Photo ID</FormLabel>
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px dashed #ccc',
              borderRadius: 1,
              padding: 2
            }}
          >
            {imagePreviews.photoID ? (
              <Box sx={{ mb: 2 }}>
                <img 
                  src={imagePreviews.photoID} 
                  alt="Photo ID Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px' }} 
                />
              </Box>
            ) : (
              <Image sx={{ fontSize: 60, color: '#ccc', mb: 1 }} />
            )}
            
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="photo-id-upload"
              type="file"
              onChange={handleImageUpload('photoID')}
            />
            <label htmlFor="photo-id-upload">
              <Button 
                variant="outlined" 
                component="span" 
                startIcon={<Image />}
              >
                {imagePreviews.photoID ? 'Change Photo ID' : 'Upload Photo ID'}
              </Button>
            </label>
            
            {errors.photoID && (
              <FormHelperText error>Please upload a valid image for Photo ID</FormHelperText>
            )}
          </Box>
        </FormControl>

        {/* Signature Upload */}
        <FormControl fullWidth margin="normal">
          <FormLabel component="legend">Signature</FormLabel>
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px dashed #ccc',
              borderRadius: 1,
              padding: 2
            }}
          >
            {imagePreviews.signature ? (
              <Box sx={{ mb: 2 }}>
                <img 
                  src={imagePreviews.signature} 
                  alt="Signature Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px' }} 
                />
              </Box>
            ) : (
              <Image sx={{ fontSize: 60, color: '#ccc', mb: 1 }} />
            )}
            
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="signature-upload"
              type="file"
              onChange={handleImageUpload('signature')}
            />
            <label htmlFor="signature-upload">
              <Button 
                variant="outlined" 
                component="span" 
                startIcon={<Image />}
              >
                {imagePreviews.signature ? 'Change Signature' : 'Upload Signature'}
              </Button>
            </label>
            
            {errors.signature && (
              <FormHelperText error>Please upload a valid image for Signature</FormHelperText>
            )}
          </Box>
        </FormControl>
      </div>
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