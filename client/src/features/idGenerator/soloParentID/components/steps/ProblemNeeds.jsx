import { useState, useEffect } from "react";
import { Button, Typography } from '@mui/material';

import { useFormContext } from "../../components/others/FormContext";
import { Notification } from "../../../components/Notification";
import { TextInput } from '../../../../../components/common/FormFields'


export default function ProblemNeeds({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({ causeSoloParent: '', needsSoloParent: '' }); 
  const [errors, setErrors] = useState({ causeSoloParent: false, needsSoloParent: false }); 

  useEffect(() => {
    if (formData.problemNeeds) {
      setValues(prev => ({ ...prev, ...formData.problemNeeds }));
    }
  }, [formData.problemNeeds]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach(field => {
      if (!values[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      setSnackbarMessage("Please fill in all required fields");
      setSeverity('error');
      setSnackbarOpen(true);
      
      return;
    }

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
      if (value === '' || value === null) {
        processedValues[key] = 'N/A';
      }
    });
    
    updateFormData('problemNeeds', processedValues);
    console.log("Problem & Needs:", processedValues);
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>SOLO PARENT CIRCUMTANCES, PROBLEMS, AND NEEDS</div>
      <div className='responsive-details'>
        <TextInput
          value={values.causeSoloParent}
          onChange={handleChange('causeSoloParent')}
          error={errors.causeSoloParent}
          helperText = {errors.causeSoloParent || 'e.g. ---'}
          placeholder={'Classification/Circumtances of being a solo parent (Dahilan bakit naging solo parent)'}
          multiline
          required
        />
        <TextInput
          value={values.needsSoloParent}
          onChange={handleChange('needsSoloParent')}
          error={errors.needsSoloParent}
          helperText = {errors.needsSoloParent || 'e.g. Santos'}
          placeholder={'Needs/Problem of being a solo parent (Kinakailangan/Problema ng isa ng solo parent)'}
          multiline
          required
        />
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