import { useState, useEffect } from "react";
import { Box, Button } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { Notification } from "../../../components/Notification";

export default function PhotoID({ handleBack, handleNext }) {
  
  const { formData, updateFormData } = useFormContext();
  
  const [image, setImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if (formData.photoID && formData.photoID.image) {
      setImage(formData.photoID.image);
    }
  }, [formData.photoID]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      setImage({
        file: file,           
        preview: URL.createObjectURL(file),
        fileName: file.name
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!image) {
      setSnackbarMessage("Please upload an image first");
      setSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    updateFormData('photoID', { image });
    console.log("Photo ID uploaded");
    
    handleNext();
  };

  return (
    <div className='responsive-container'>
      <div className='responsive-header'>PHOTO</div>
      <div className='responsive-form'>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-button"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-button">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {image && (
            <img 
              src={image.preview} 
              alt="Uploaded" 
              width={300} 
              style={{ borderRadius: "8px" }} 
            />
          )}
        </Box>
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