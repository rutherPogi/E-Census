import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, 
         FormLabel, FormHelperText } from "@mui/material";

         
import { TextInput } from '../others/FormFields'
import { useFormContext } from "../../pages/FormContext";
import { Notification } from '../../../../components/common/Notification'
 


export default function WaterInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

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

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleTextChange = (field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification('Please fill in all required fields', 'error');
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
          helperText = {errors.sourceWater || 'e.g., ---'}
          placeholder = 'Enter sources of water'
          required
        />
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