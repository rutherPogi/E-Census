import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import dayjs from "dayjs";

import { useFormContext } from "../../components/others/FormContext";
import { Notification } from "../../../components/Notification";
import { TextInput, DateInput } from '../../../../../components/common/FormFields'


export default function OscaMembership({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    associationName: '',
    asOfficer: null,
    position: ''
  }); 

  const [errors, setErrors] = useState({
    associationName: false,
    asOfficer: false,
    position: false
  }); 

  useEffect(() => {
    if (formData.oscaMembership) {
      setValues(prev => ({ ...prev, ...formData.oscaMembership }));
    }
  }, [formData.oscaMembership]);

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

  const handleDateChange = (newValue) => {
    // Check if the date is valid
    if (!newValue || !newValue.isValid()) {
      setValues(prev => ({ ...prev, asOfficer: null }));
      setErrors(prev => ({ ...prev, asOfficer: 'Invalid date' }));
      return;
    }

    // Check if the selected date is in the future
    const today = dayjs();

    if (newValue.isAfter(today)) {
      setValues(prev => ({ ...prev, asOfficer: newValue }));
      setErrors(prev => ({ ...prev, asOfficer: 'Birthdate cannot be in the future' }));
      return;
    }

    // Valid date and not in the future
    setValues(prev => ({ ...prev, asOfficer: newValue }));
    setErrors(prev => ({ ...prev, asOfficer: false }));
  };

  const handleChange = (field) => (e, newValue) => {
    let value = newValue?.value || e.target.value;

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
    
    updateFormData('oscaMembership', processedValues);
    console.log("Professional Information:", processedValues);
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>OSCA</div>
      <div className='responsive-form'>
        <TextInput
          label='Name of Association'
          value={values.associationName}
          onChange={handleChange('associationName')}
          error={errors.associationName}
          helperText = {errors.associationName || 'e.g. ---'}
          required
        />
        <DateInput
          label =  'Date elected as officer'
          value =  {values.asOfficer}
          onChange={handleDateChange}
          error = {errors.asOfficer}  
          helperText =  {errors.asOfficer || 'If an officer, date elected'}
          required
        />
        <TextInput
          label='Position'
          value={values.position}
          onChange={handleChange('position')}
          error={errors.position}
          helperText = {errors.position || 'e.g. ---'}
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