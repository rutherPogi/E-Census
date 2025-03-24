import { useState, useEffect } from "react";
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { Notification } from "../../../components/Notification";


export default function DisabilityInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  
  const [values, setValues] = useState({ 
    disabilityType: '', 
    disabilityCause: '',
    disabilitySpecific: '' 
  }); 
  
  const [errors, setErrors] = useState({ 
    disabilityType: false, 
    disabilityCause: false,
    disabilitySpecific: false
  }); 

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (formData.disabilityInfo) {
      setValues(prev => ({ ...prev, ...formData.disabilityInfo }));
    }
  }, [formData.disabilityInfo]);

  const validateForm = () => {
    const newErrors = {
      disabilityType: !values.disabilityType,
      disabilityCause: !values.disabilityCause,
      disabilitySpecific: values.disabilityCause && !values.disabilitySpecific
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear specific disability selection when cause changes
    if (name === 'disabilityCause') {
      setValues({ 
        ...values, 
        [name]: value,
        disabilitySpecific: '' 
      });
    } else {
      setValues({ ...values, [name]: value });
    }
    
    if (value) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    updateFormData('disabilityInfo', values);
    console.log("Disability Information:", values);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>DISABILITY INFORMATION</div>
      <div className='responsive-form'>
        <FormControl 
          component="fieldset" 
          error={errors.disabilityType} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Type of Disability</FormLabel>
          <RadioGroup
            name="disabilityType"
            value={values.disabilityType}
            onChange={handleChange}
          >
            <FormControlLabel value="Deaf / Hard of Hearing" control={<Radio />} label="Deaf / Hard of Hearing"/>
            <FormControlLabel value="Intellectual Disability" control={<Radio />} label="Intellectual Disability"/>
            <FormControlLabel value="Learning Disability" control={<Radio />} label="Learning Disability" />
            <FormControlLabel value="Physical Disability (Orthopedic)" control={<Radio />} label="Physical Disability (Orthopedic)"/>
            <FormControlLabel value="Psychological Disability" control={<Radio />} label="Psychological Disability"/>
            <FormControlLabel value="Speech and Language Impairment" control={<Radio />} label="Speech and Language Impairment"/>
            <FormControlLabel value="Visual Disability" control={<Radio />} label="Visual Disability"/>
            <FormControlLabel value="Cancer (RA 11215)" control={<Radio />} label="Cancer (RA 11215)"/>
            <FormControlLabel value="Rare Disease (RA 10747)" control={<Radio />} label="Rare Disease (RA 10747)"/>
          </RadioGroup>
          {errors.disabilityType && (
            <FormHelperText>Please select a type of disability</FormHelperText>
          )}
        </FormControl>

        <FormControl 
          component="fieldset" 
          error={errors.disabilityCause} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Cause of Disability</FormLabel>
          <RadioGroup
            name="disabilityCause"
            value={values.disabilityCause}
            onChange={handleChange}
          >
            <FormControlLabel value="Congenital / Inborn" control={<Radio />} label="Congenital / Inborn"/>
            <FormControlLabel value="Acquired" control={<Radio />} label="Acquired"/>
          </RadioGroup>
          {errors.disabilityCause && (
            <FormHelperText>Please select a cause of disability</FormHelperText>
          )}
        </FormControl>

        {values.disabilityCause === "Congenital / Inborn" && (
          <FormControl 
            component="fieldset" 
            error={errors.disabilitySpecific} 
            fullWidth 
            margin="normal"
          >
            <FormLabel component="legend">Specific Congenital Condition</FormLabel>
            <RadioGroup
              name="disabilitySpecific"
              value={values.disabilitySpecific}
              onChange={handleChange}
            >
              <FormControlLabel value="Autism" control={<Radio />} label="Autism"/>
              <FormControlLabel value="ADHD" control={<Radio />} label="ADHD"/>
              <FormControlLabel value="Cerebral Palsy" control={<Radio />} label="Cerebral Palsy"/>
              <FormControlLabel value="Down Syndrome" control={<Radio />} label="Down Syndrome"/>
            </RadioGroup>
            {errors.disabilitySpecific && (
              <FormHelperText>Please select a specific condition</FormHelperText>
            )}
          </FormControl>
        )}

        {values.disabilityCause === "Acquired" && (
          <FormControl 
            component="fieldset" 
            error={errors.disabilitySpecific} 
            fullWidth 
            margin="normal"
          >
            <FormLabel component="legend">Specific Acquired Condition</FormLabel>
            <RadioGroup
              name="disabilitySpecific"
              value={values.disabilitySpecific}
              onChange={handleChange}
            >
              <FormControlLabel value="Chronic Illness" control={<Radio />} label="Chronic Illness"/>
              <FormControlLabel value="Cerebral Palsy" control={<Radio />} label="Cerebral Palsy"/>
              <FormControlLabel value="Injury" control={<Radio />} label="Injury"/>
            </RadioGroup>
            {errors.disabilitySpecific && (
              <FormHelperText>Please select a specific condition</FormHelperText>
            )}
          </FormControl>
        )}
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
  )
}