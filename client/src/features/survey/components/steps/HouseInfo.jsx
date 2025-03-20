import { useState, useEffect } from "react";
import { Snackbar, Alert, Box, Button } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, 
         FormHelperText } from "@mui/material";
import { Image } from "@mui/icons-material";

import { useFormContext } from "../../pages/FormContext";
import { Notification } from '../../../../components/common/Notification'


export default function HouseInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('error');

  const [imagePreview, setImagePreview] = useState('');

  // Initialize state with existing form data
  const [values, setValues] = useState({
    houseCondition: formData.houseInfo?.houseCondition || '',
    houseStructure: formData.houseInfo?.houseStructure || '',
    houseImage: formData.houseInfo?.houseImage || null
  });

  const [errors, setErrors] = useState({
    houseCondition: false,
    houseStructure: false,
    houseImage: false
  });

  useEffect(() => {
    if (formData.houseInfo) {
      setValues({
        houseCondition: formData.houseInfo.houseCondition || "",
        houseStructure: formData.houseInfo.houseStructure || "",
        houseImage: formData.houseInfo.houseImage || null
      });
      
      // Set image preview if image exists
      if (formData.houseInfo.houseImage && formData.houseInfo.houseImagePreview) {
        setImagePreview(formData.houseInfo.houseImagePreview);
      }
    }
  }, [formData.houseInfo]);

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, houseImage: true }));
      showNotification('Please select an image file', 'error');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, houseImage: true }));
      showNotification('Image size should be less than 5MB', 'error');
      return;
    }
    
    // Create URL for preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    // Update values state with the file
    setValues(prev => ({ ...prev, houseImage: file }));
    setErrors(prev => ({ ...prev, houseImage: false }));
    showNotification('Image uploaded successfully', 'success');
  };

  const validateForm = () => {
    const newErrors = {
      houseCondition: !values.houseCondition,
      houseStructure: !values.houseStructure,
      houseImage: !values.houseImage
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    updateFormData('houseInfo', { ...values, houseImagePreview: imagePreview });

    console.log("Current Form Values:", values);
    console.log("All Form Data:", formData);

    handleNext();
  }; 

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>HOUSING CONDITIONING AND STRUCTURE</div>
      <form id="survey-form" className="responsive-details" onSubmit={handleSubmit}>
        {/* Housing Condition Radio Group */}
        <FormControl 
          component="fieldset" 
          error={errors.houseCondition} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Housing Conditioning</FormLabel>
          <RadioGroup
            name="houseCondition"
            value={values.houseCondition}
            onChange={handleChange}
            
          >
            <FormControlLabel value="Own" control={<Radio />} label="Own" />
            <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
            <FormControlLabel value="Caretaker" control={<Radio />} label="Caretaker" />
            <FormControlLabel value="Share" control={<Radio />} label="Share" />
          </RadioGroup>
          {errors.houseCondition && (
            <FormHelperText>Please select a housing condition</FormHelperText>
          )}
        </FormControl>

        {/* Housing Structure Radio Group */}
        <FormControl 
          component="fieldset" 
          error={errors.houseStructure} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Housing Structure</FormLabel>
          <RadioGroup
            name="houseStructure"
            value={values.houseStructure}
            onChange={handleChange}
          >
            <FormControlLabel value="Concrete" control={<Radio />} label="Concrete" />
            <FormControlLabel value="Semi Concrete" control={<Radio />} label="Semi Concrete" />
            <FormControlLabel value="Light Materials" control={<Radio />} label="Light Materials" />
            <FormControlLabel value="Make Shift" control={<Radio />} label="Make Shift" />
          </RadioGroup>
          {errors.houseStructure && (
            <FormHelperText>Please select a housing structure</FormHelperText>
          )}
        </FormControl>

        {/* Image Upload Section */}
        <FormControl fullWidth margin="normal">
          <FormLabel component="legend">House Image</FormLabel>
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
            {imagePreview ? (
              <Box sx={{ mb: 2 }}>
                <img 
                  src={imagePreview} 
                  alt="House Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px' }} 
                />
              </Box>
            ) : (
              <Image sx={{ fontSize: 60, color: '#ccc', mb: 1 }} />
            )}
            
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
                startIcon={<Image />}
              >
                {imagePreview ? 'Change Image' : 'Upload House Image'}
              </Button>
            </label>
            
            {errors.houseImage && (
              <FormHelperText error>Please upload a valid image</FormHelperText>
            )}
          </Box>
        </FormControl>
      </form>
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
  )
}