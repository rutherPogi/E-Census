import { useFormContext } from "../../pages/FormContext";
import { useState, useEffect } from "react";
import { Snackbar, Alert } from '@mui/material';
import { 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel, 
  FormHelperText
} from "@mui/material";
import { TextInput } from '../others/FormFields'
 

export default function WaterInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [values, setValues] = useState({
    accessWater: formData.accessWater || '',
    potableWater: formData.potableWater || '',
    sourceWater: formData.sourceWater || ''
  })

  const [errors, setErrors] = useState({
    accessWater: false,
    potableWater: false,
    sourceWater: false
  });

  useEffect(() => {
    if (formData.waterInfo) {
      setValues({
        accessWater: formData.waterInfo.accessWater || '',
        potableWater: formData.waterInfo.potableWater || '',
        sourceWater: formData.waterInfo.sourceWater || ''
      });
    }
  }, [formData.waterInfo]);

  const validateForm = () => {
    const newErrors = {
      accessWater: !values.accessWater,
      potableWater: !values.potableWater,
      sourceWater: !values.sourceWater
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    // Clear error when field is filled
    if (value) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  const handleTextChange = (field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (value) {
      setErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage("Please fill in all required fields");
      setSnackbarOpen(true);
      return;
    }

    updateFormData('waterInfo', values);

    console.log("Current Form Values:", values);
    console.log("All Form Data:", formData);

    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>WATER INFORMATION</div>
      <form id='survey-form' className='responsive-details'>
        <FormControl 
          component="fieldset" 
          error={errors.accessWater} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Access to water (Level III)?</FormLabel>
          <RadioGroup name="accessWater" value={values.accessWater} onChange={handleChange}>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup> 
          {errors.accessWater && ( <FormHelperText>Please select an answer</FormHelperText>)}
        </FormControl>
        <FormControl 
          component="fieldset" 
          error={errors.potableWater} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Is your water potable?</FormLabel>
          <RadioGroup name="potableWater" value={values.potableWater} onChange={handleChange}>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.potableWater && ( <FormHelperText>Please select an answer</FormHelperText> )}
        </FormControl>
        <TextInput
          label='Sources of Water'
          value={values.sourceWater}
          onChange={handleTextChange('sourceWater')}
          error={errors.sourceWater}
          helperText = {errors.sourceWater}
          placeholder = 'Enter sources of water'
          required
        />
      </form>
      <div className='form-buttons'>
          <div className='form-buttons-right'>
            <button type='button' className="btn cancel-btn" onClick={handleBack}>Back</button>
            <button type='button' className="btn submit-btn" onClick={handleSubmit}>Next</button>
          </div>     
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}